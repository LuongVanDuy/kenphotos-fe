"use client";

import React, { useEffect, useState } from "react";
import { Card, Tabs, message, Typography, Button } from "antd";
import { SaveOutlined, PlusOutlined, MenuOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetting, upsertSetting } from "@/store/actions/settings";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MenuItem, FlatMenuItem } from "./menuUtils";
import {
  generateId,
  processMenuData,
  processMenuForSave,
  flattenMenu,
  rebuildHierarchy,
  normalizeOrdersRecursively,
  isDescendant,
  getDescendants,
  updateAllParentGroupOrders,
} from "./menuUtils";
import SortableMenuItem from "./SortableMenuItem";
import MenuForm, { MenuFormData } from "./MenuForm";

const { Title, Text } = Typography;

export default function MenuPage() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("menuHeader");
  const [loading, setLoading] = useState(false);
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>();
  const [parentId, setParentId] = useState<string | undefined>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (session?.accessToken) {
      loadMenuData();
    }
  }, [activeTab, session?.accessToken]);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(
        fetchSetting(activeTab, session?.accessToken || "") as any
      );

      let menuData = null;

      // Handle different API response formats
      if (response?.payload?.data?.settings) {
        // Original format: array of settings with key-value pairs
        menuData = response.payload.data.settings.find(
          (s: any) => s.key === "menu"
        );

        if (menuData) {
          const parsedMenu = JSON.parse(menuData.value);
          const processedMenu = processMenuData(parsedMenu);

          if (activeTab === "menuHeader") {
            setHeaderMenu(processedMenu || []);
          } else {
            setFooterMenu(processedMenu || []);
          }
        }
      } else if (response?.payload?.data?.data) {
        // New format: data field contains stringified JSON
        try {
          const parsedData = JSON.parse(response.payload.data.data);
          const processedMenu = processMenuData(parsedData);

          if (activeTab === "menuHeader") {
            setHeaderMenu(processedMenu || []);
          } else {
            setFooterMenu(processedMenu || []);
          }
        } catch (parseError) {
          console.error("Error parsing menu data:", parseError);
          if (activeTab === "menuHeader") {
            setHeaderMenu([]);
          } else {
            setFooterMenu([]);
          }
        }
      } else if (
        response?.payload?.data &&
        typeof response.payload.data === "string"
      ) {
        // Direct string format
        try {
          const parsedData = JSON.parse(response.payload.data);
          const processedMenu = processMenuData(parsedData);

          if (activeTab === "menuHeader") {
            setHeaderMenu(processedMenu || []);
          } else {
            setFooterMenu(processedMenu || []);
          }
        } catch (parseError) {
          console.error("Error parsing string data:", parseError);
          if (activeTab === "menuHeader") {
            setHeaderMenu([]);
          } else {
            setFooterMenu([]);
          }
        }
      } else {
        // No menu data found
        if (activeTab === "menuHeader") {
          setHeaderMenu([]);
        } else {
          setFooterMenu([]);
        }
      }
    } catch (error) {
      console.error("Error loading menu data:", error);
      if (activeTab === "menuHeader") {
        setHeaderMenu([]);
      } else {
        setFooterMenu([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getCurrentMenu = (): MenuItem[] => {
    if (activeTab === "menuHeader") return headerMenu;
    return footerMenu;
  };

  const setCurrentMenu = (menu: MenuItem[]) => {
    if (activeTab === "menuHeader") {
      setHeaderMenu(menu);
    } else {
      setFooterMenu(menu);
    }
  };

  // Handle reordering within same parent group
  const handleSameParentReorder = (
    flatItems: FlatMenuItem[],
    activeItem: FlatMenuItem,
    overItem: FlatMenuItem,
    active: any,
    over: any
  ): FlatMenuItem[] => {
    const activeParentKey = activeItem.parentId || "root";

    // Group items by parent
    const itemsByParent: { [key: string]: FlatMenuItem[] } = {};
    flatItems.forEach((item) => {
      const parentKey = item.parentId || "root";
      if (!itemsByParent[parentKey]) {
        itemsByParent[parentKey] = [];
      }
      itemsByParent[parentKey].push(item);
    });

    // Sort each parent group by current order in flatItems array
    Object.keys(itemsByParent).forEach((parentKey) => {
      itemsByParent[parentKey].sort((a, b) => {
        const aIndex = flatItems.findIndex((fi) => fi.id === a.id);
        const bIndex = flatItems.findIndex((fi) => fi.id === b.id);
        return aIndex - bIndex;
      });
    });

    const parentGroup = itemsByParent[activeParentKey];
    const activeLocalIndex = parentGroup.findIndex(
      (item) => item.id === active.id
    );
    const overLocalIndex = parentGroup.findIndex((item) => item.id === over.id);

    if (activeLocalIndex === -1 || overLocalIndex === -1) {
      return flatItems;
    }

    const reorderedGroup = arrayMove(
      parentGroup,
      activeLocalIndex,
      overLocalIndex
    );
    reorderedGroup.forEach((item, index) => {
      item.order = index;
    });

    // Rebuild flat array with reordered group
    const newFlatItems: FlatMenuItem[] = [];
    const itemsByParentAll: { [key: string]: FlatMenuItem[] } = {};

    flatItems.forEach((item) => {
      const parentKey = item.parentId || "root";
      if (!itemsByParentAll[parentKey]) {
        itemsByParentAll[parentKey] = [];
      }
      itemsByParentAll[parentKey].push(item);
    });

    itemsByParentAll[activeParentKey] = reorderedGroup;

    const addItemsToFlat = (parentKey: string, level: number) => {
      const items = itemsByParentAll[parentKey] || [];
      items.forEach((item) => {
        newFlatItems.push({ ...item, level });
        addItemsToFlat(item.id, level + 1);
      });
    };

    addItemsToFlat("root", 0);
    return newFlatItems;
  };

  // Handle moving to different parent group
  const handleDifferentParentMove = (
    flatItems: FlatMenuItem[],
    activeItem: FlatMenuItem,
    overItem: FlatMenuItem
  ): { newFlatItems: FlatMenuItem[]; successMessage: string } | null => {
    const newParentId = overItem.parentId;
    const newLevel = overItem.level;

    // Check level limit
    if (newLevel >= 3) {
      message.warning("Cannot move beyond 4 levels deep");
      return null;
    }

    // Check if moving descendants would exceed level limit
    const descendants = getDescendants(activeItem, flatItems);
    const maxDescendantLevel = Math.max(
      ...descendants.map((d) => d.level),
      activeItem.level
    );
    const levelDiff = newLevel - activeItem.level;
    if (maxDescendantLevel + levelDiff > 3) {
      message.warning("Cannot move: would create nesting deeper than 4 levels");
      return null;
    }

    // Update items with new parent and level
    let newFlatItems = flatItems.map((item) => {
      if (item.id === activeItem.id) {
        return { ...item, level: newLevel, parentId: newParentId };
      } else if (isDescendant(activeItem, item, flatItems)) {
        return { ...item, level: item.level + levelDiff };
      }
      return item;
    });

    // Handle positioning
    const itemsToMove: FlatMenuItem[] = [];
    const movedItemIds = new Set([
      activeItem.id,
      ...getDescendants(activeItem, flatItems).map((d) => d.id),
    ]);

    newFlatItems.forEach((item) => {
      if (movedItemIds.has(item.id)) {
        itemsToMove.push(
          newFlatItems.find((updatedItem) => updatedItem.id === item.id)!
        );
      }
    });

    newFlatItems = newFlatItems.filter((item) => !movedItemIds.has(item.id));

    const insertPosition = newFlatItems.findIndex(
      (item) => item.id === overItem.id
    );
    if (insertPosition !== -1) {
      newFlatItems.splice(insertPosition, 0, ...itemsToMove);
    } else {
      newFlatItems.push(...itemsToMove);
    }

    newFlatItems = updateAllParentGroupOrders(newFlatItems);

    return {
      newFlatItems,
      successMessage: `Item moved successfully (Level ${activeItem.level} → ${newLevel})`,
    };
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const currentMenu = getCurrentMenu();
    const flatItems = flattenMenu(currentMenu);

    const activeIndex = flatItems.findIndex((item) => item.id === active.id);
    const overIndex = flatItems.findIndex((item) => item.id === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    const activeItem = flatItems[activeIndex];
    const overItem = flatItems[overIndex];

    // Check if we're trying to move a parent into its own descendant
    if (isDescendant(activeItem, overItem, flatItems)) {
      message.warning("Cannot move parent item into its own child");
      return;
    }

    let newFlatItems: FlatMenuItem[];
    let successMessage = "Menu items reordered successfully";

    const activeParentKey = activeItem.parentId || "root";
    const overParentKey = overItem.parentId || "root";

    if (activeParentKey === overParentKey) {
      newFlatItems = handleSameParentReorder(
        flatItems,
        activeItem,
        overItem,
        active,
        over
      );
    } else {
      const result = handleDifferentParentMove(flatItems, activeItem, overItem);
      if (!result) return;
      newFlatItems = result.newFlatItems;
      successMessage = result.successMessage;
    }

    const newHierarchy = rebuildHierarchy(newFlatItems);
    const finalHierarchy = normalizeOrdersRecursively(newHierarchy);

    setCurrentMenu(finalHierarchy);
    message.success(successMessage);
  };

  const handlePromote = (itemId: string) => {
    const currentMenu = getCurrentMenu();
    const flatItems = flattenMenu(currentMenu);
    const item = flatItems.find((i) => i.id === itemId);

    if (!item || item.level === 0) {
      message.warning("Cannot promote top-level items");
      return;
    }

    const newFlatItems = flatItems.map((flatItem) => {
      if (flatItem.id === itemId) {
        const currentParent = flatItems.find((p) => p.id === flatItem.parentId);
        const newParentId = currentParent?.parentId;
        return {
          ...flatItem,
          level: flatItem.level - 1,
          parentId: newParentId,
        };
      }
      return flatItem;
    });

    const updatedFlatItems = updateAllParentGroupOrders(newFlatItems);
    const newHierarchy = rebuildHierarchy(updatedFlatItems);
    const finalHierarchy = normalizeOrdersRecursively(newHierarchy);

    setCurrentMenu(finalHierarchy);
  };

  const handleDemote = (itemId: string) => {
    const currentMenu = getCurrentMenu();
    const flatItems = flattenMenu(currentMenu);
    const itemIndex = flatItems.findIndex((i) => i.id === itemId);
    const item = flatItems[itemIndex];

    if (!item || item.level >= 3) {
      message.warning("Cannot demote beyond 4 levels");
      return;
    }

    // Find a potential new parent (previous sibling at the same level)
    let newParentId = item.parentId;
    for (let i = itemIndex - 1; i >= 0; i--) {
      const prevItem = flatItems[i];
      if (
        prevItem.level === item.level &&
        prevItem.parentId === item.parentId
      ) {
        newParentId = prevItem.id;
        break;
      }
      if (prevItem.level < item.level) break;
    }

    if (newParentId === item.parentId) {
      message.warning("No suitable parent found for demotion");
      return;
    }

    const newFlatItems = flatItems.map((flatItem) => {
      if (flatItem.id === itemId) {
        return {
          ...flatItem,
          level: flatItem.level + 1,
          parentId: newParentId,
        };
      }
      return flatItem;
    });

    const updatedFlatItems = updateAllParentGroupOrders(newFlatItems);
    const newHierarchy = rebuildHierarchy(updatedFlatItems);
    const finalHierarchy = normalizeOrdersRecursively(newHierarchy);

    setCurrentMenu(finalHierarchy);
  };

  // Check if item can be promoted
  const canPromote = (item: FlatMenuItem): boolean => {
    return item.level > 0;
  };

  // Check if item can be demoted
  const canDemote = (itemId: string): boolean => {
    const currentMenu = getCurrentMenu();
    const flatItems = flattenMenu(currentMenu);
    const itemIndex = flatItems.findIndex((i) => i.id === itemId);
    const item = flatItems[itemIndex];

    if (!item || item.level >= 3) return false;

    // Check if there's a suitable parent (previous sibling)
    for (let i = itemIndex - 1; i >= 0; i--) {
      const prevItem = flatItems[i];
      if (
        prevItem.level === item.level &&
        prevItem.parentId === item.parentId
      ) {
        return true;
      }
      if (prevItem.level < item.level) {
        break;
      }
    }
    return false;
  };

  const handleAddMenu = () => {
    setEditingItem(undefined);
    setParentId(undefined);
    setFormVisible(true);
  };

  const handleAddChild = (parentId: string) => {
    setEditingItem(undefined);
    setParentId(parentId);
    setFormVisible(true);
  };

  const handleEditMenu = (item: MenuItem) => {
    setEditingItem(item);
    setParentId(undefined);
    setFormVisible(true);
  };

  const handleDeleteMenu = (id: string) => {
    const currentMenu = getCurrentMenu();
    const removeItem = (items: MenuItem[]): MenuItem[] => {
      return items.filter((item) => {
        if (item.id === id) return false;
        if (item.children) {
          item.children = removeItem(item.children);
        }
        return true;
      });
    };

    const newMenu = removeItem(currentMenu);
    setCurrentMenu(newMenu);
    message.success("Menu item deleted successfully");
  };

  const handleFormSubmit = (values: MenuFormData) => {
    const newItem: MenuItem = {
      id: editingItem?.id || generateId(),
      name: values.name,
      slug: values.slug,
      order: editingItem?.order || 0,
      children: editingItem?.children || [],
      parentId: parentId,
    };

    const currentMenu = getCurrentMenu();
    let newMenu: MenuItem[];

    if (editingItem) {
      // Edit existing item
      const updateItem = (items: MenuItem[]): MenuItem[] => {
        return items.map((item) => {
          if (item.id === editingItem.id) {
            return { ...item, name: newItem.name, slug: newItem.slug };
          }
          if (item.children) {
            item.children = updateItem(item.children);
          }
          return item;
        });
      };
      newMenu = updateItem(currentMenu);
      message.success("Menu item updated successfully");
    } else if (parentId) {
      // Add child item
      const addChild = (items: MenuItem[]): MenuItem[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            const newChildren = [...(item.children || [])];
            newChildren.push({
              ...newItem,
              order: newChildren.length,
              parentId: parentId,
            });
            return {
              ...item,
              children: newChildren,
            };
          }
          if (item.children) {
            item.children = addChild(item.children);
          }
          return item;
        });
      };
      newMenu = addChild(currentMenu);
      message.success("Sub-menu item added successfully");
    } else {
      // Add top-level item
      newMenu = [...currentMenu, { ...newItem, order: currentMenu.length }];
      message.success("Menu item added successfully");
    }

    setCurrentMenu(newMenu);
    setFormVisible(false);
    setEditingItem(undefined);
    setParentId(undefined);
  };

  const handleSaveMenu = async (values: any) => {
    setLoading(true);

    const currentMenu = getCurrentMenu();
    const processedMenu = processMenuForSave(currentMenu);

    const menuString = JSON.stringify(processedMenu);

    const settingsArray = [
      {
        key: "data",
        value: menuString,
      },
    ];

    dispatch(
      upsertSetting(
        {
          namespace: activeTab,
          data: { settings: settingsArray },
        },
        session?.accessToken || "",
        () => setLoading(false),
        () => setLoading(false)
      ) as any
    );
  };

  const renderMenuContent = (menu: MenuItem[], menuType: string) => {
    // Ensure menu is sorted before flattening
    const sortedMenu = [...menu].sort((a, b) => a.order - b.order);
    const flatItems = flattenMenu(sortedMenu);

    return (
      <Card loading={loading}>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Title level={4} className="mb-2">
                {menuType} Menu
              </Title>
              <Text type="secondary">
                Manage your website's {menuType.toLowerCase()} navigation menu.
                Drag and drop items anywhere - they will automatically adjust
                levels and parents as needed. Maximum 4 levels deep supported.
              </Text>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddMenu}
              size="middle"
            >
              Add Menu Item
            </Button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={flatItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {flatItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MenuOutlined className="text-4xl mb-2" />
                  <div>No menu items yet</div>
                  <div className="text-sm">
                    Click "Add Menu Item" to get started
                  </div>
                </div>
              ) : (
                flatItems.map((item) => (
                  <SortableMenuItem
                    key={item.id}
                    item={item}
                    onEdit={handleEditMenu}
                    onDelete={handleDeleteMenu}
                    onAddChild={handleAddChild}
                    onPromote={handlePromote}
                    onDemote={handleDemote}
                    canPromote={canPromote(item)}
                    canDemote={canDemote(item.id)}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>

        {menu.length > 0 && (
          <div className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              onClick={handleSaveMenu}
              size="middle"
              block={isMobile}
            >
              Save {menuType} Menu
            </Button>
          </div>
        )}
      </Card>
    );
  };

  const tabItems = [
    {
      key: "menuHeader",
      label: "Header Menu",
      children: renderMenuContent(headerMenu, "Header"),
    },
    {
      key: "menuFooter",
      label: "Footer Menu",
      children: renderMenuContent(footerMenu, "Footer"),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold mb-4 lg:mb-6">
        Menu Management
      </h1>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
        tabPosition="top"
        className="menu-tabs"
      />

      <MenuForm
        visible={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setEditingItem(undefined);
          setParentId(undefined);
        }}
        onSubmit={handleFormSubmit}
        initialValues={editingItem}
        parentId={parentId}
      />
    </div>
  );
}
