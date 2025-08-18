"use client";

import React, { act, useEffect, useState } from "react";
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
import { FlatMenuItem, MenuFormData, MenuItem } from "@/types";
import SortableMenuItem from "./SortableMenuItem";
import MenuForm from "./MenuForm";

const { Title, Text } = Typography;

export default function MenuPage() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("header");
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
    if (session?.accessToken && activeTab === "header") {
      dispatch(fetchSetting("menuHeader", session?.accessToken));
    } else if (session?.accessToken && activeTab === "footer") {
      dispatch(fetchSetting("menuFooter", session?.accessToken));
    }
  }, [activeTab, session?.accessToken]);

  const settingData = useSelector((state: RootState) => state.settings.detail);
  const settingLoading = useSelector(
    (state: RootState) => state.settings.loading
  );

  useEffect(() => {
    if (settingLoading) return;

    let processedMenu: MenuItem[] = [];

    try {
      if (settingData?.data) {
        const menu = JSON.parse(settingData.data);
        processedMenu = processMenuData(menu);
      }
    } catch (e) {
      console.error("Failed to parse menu data:", e);
    }

    if (activeTab === "header") {
      setHeaderMenu(processedMenu);
    } else {
      setFooterMenu(processedMenu);
    }
  }, [activeTab, settingData, settingLoading]);

  const processMenuData = (menu: any[]): MenuItem[] => {
    return menu.map((item: any, index: number) => ({
      id: item.id || generateId(),
      name: item.name,
      slug: item.slug,
      children: item.children
        ? processChildrenData(item.children, item.id)
        : [],
      order: item.order || index,
    }));
  };

  const processChildrenData = (
    children: any[],
    parentId: string
  ): MenuItem[] => {
    return children.map((child: any, childIndex: number) => ({
      id: child.id || generateId(),
      name: child.name,
      slug: child.slug,
      children: child.children
        ? processChildrenData(child.children, child.id)
        : [],
      order: child.order || childIndex,
      parentId: parentId,
    }));
  };

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const getCurrentMenu = (): MenuItem[] => {
    if (activeTab === "header") return headerMenu;
    if (activeTab === "footer") return footerMenu;
    return [];
  };

  const setCurrentMenu = (menu: MenuItem[]) => {
    if (activeTab === "header") {
      setHeaderMenu(menu);
    } else if (activeTab === "footer") {
      setFooterMenu(menu);
    }
  };

  const flattenMenu = (
    items: MenuItem[],
    level: number = 0,
    parentId?: string
  ): FlatMenuItem[] => {
    const result: FlatMenuItem[] = [];

    items.forEach((item, index) => {
      result.push({
        ...item,
        level,
        parentId,
        order: item.order,
      });
      if (item.children && item.children.length > 0) {
        result.push(...flattenMenu(item.children, level + 1, item.id));
      }
    });

    return result;
  };

  const rebuildHierarchy = (flatItems: FlatMenuItem[]): MenuItem[] => {
    const itemMap: { [key: string]: MenuItem & { tempChildren: MenuItem[] } } =
      {};
    const result: MenuItem[] = [];

    flatItems.forEach((item) => {
      itemMap[item.id] = {
        id: item.id,
        name: item.name,
        slug: item.slug,
        order: item.order,
        parentId: item.parentId,
        children: [],
        tempChildren: [],
      };
    });

    flatItems.forEach((item) => {
      const currentItem = itemMap[item.id];
      if (item.parentId && itemMap[item.parentId]) {
        itemMap[item.parentId].tempChildren.push(currentItem);
      } else if (!item.parentId || item.level === 0) {
        result.push(currentItem);
      }
    });

    Object.values(itemMap).forEach((item) => {
      item.children = item.tempChildren.sort((a, b) => a.order - b.order);
      (item as any).tempChildren = undefined;
    });

    return result.sort((a, b) => a.order - b.order);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const currentMenu = getCurrentMenu();
    const flatItems = flattenMenu(currentMenu);

    const activeIndex = flatItems.findIndex((item) => item.id === active.id);
    const overIndex = flatItems.findIndex((item) => item.id === over.id);

    if (activeIndex === -1 || overIndex === -1) {
      return;
    }

    const activeItem = flatItems[activeIndex];
    const overItem = flatItems[overIndex];

    if (isDescendant(activeItem, overItem, flatItems)) {
      message.warning("Cannot move parent item into its own child");
      return;
    }

    let newFlatItems = [...flatItems];
    let successMessage = "Menu items reordered successfully";

    const activeParentKey = activeItem.parentId || "root";
    const overParentKey = overItem.parentId || "root";

    if (activeParentKey === overParentKey) {
      const itemsByParent: { [key: string]: FlatMenuItem[] } = {};
      flatItems.forEach((item) => {
        const parentKey = item.parentId || "root";
        if (!itemsByParent[parentKey]) {
          itemsByParent[parentKey] = [];
        }
        itemsByParent[parentKey].push(item);
      });

      const parentGroup = itemsByParent[activeParentKey];
      const activeLocalIndex = parentGroup.findIndex(
        (item) => item.id === active.id
      );
      const overLocalIndex = parentGroup.findIndex(
        (item) => item.id === over.id
      );

      if (activeLocalIndex !== -1 && overLocalIndex !== -1) {
        const reorderedGroup = arrayMove(
          parentGroup,
          activeLocalIndex,
          overLocalIndex
        );

        reorderedGroup.forEach((item, index) => {
          item.order = index;
        });

        newFlatItems = flatItems.map((item) => {
          const itemParentKey = item.parentId || "root";
          if (itemParentKey === activeParentKey) {
            return (
              reorderedGroup.find((groupItem) => groupItem.id === item.id) ||
              item
            );
          }
          return item;
        });

        newFlatItems = updateAllParentGroupOrders(newFlatItems);
      }
    } else {
      const newParentId = overItem.parentId;
      const newLevel = overItem.level;

      if (newLevel >= 3) {
        message.warning("Cannot move beyond 4 levels deep");
        return;
      }

      const descendants = getDescendants(activeItem, flatItems);
      const maxDescendantLevel = Math.max(
        ...descendants.map((d) => d.level),
        activeItem.level
      );
      const levelDiff = newLevel - activeItem.level;
      if (maxDescendantLevel + levelDiff > 3) {
        message.warning(
          "Cannot move: would create nesting deeper than 4 levels"
        );
        return;
      }

      const updateItemAndDescendants = (
        items: FlatMenuItem[]
      ): FlatMenuItem[] => {
        return items.map((item) => {
          if (item.id === activeItem.id) {
            return {
              ...item,
              level: newLevel,
              parentId: newParentId,
            };
          } else if (isDescendant(activeItem, item, items)) {
            return {
              ...item,
              level: item.level + levelDiff,
            };
          }
          return item;
        });
      };

      newFlatItems = updateItemAndDescendants(flatItems);

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

      const overItemInNewParent = newFlatItems.find(
        (item) => item.id === overItem.id
      );

      if (overItemInNewParent) {
        const insertPosition = newFlatItems.findIndex(
          (item) => item.id === overItem.id
        );

        newFlatItems.splice(insertPosition, 0, ...itemsToMove);
        newFlatItems = updateAllParentGroupOrders(newFlatItems);
      } else {
        const newParentItems = newFlatItems.filter(
          (item) => (item.parentId || "root") === (newParentId || "root")
        );

        if (newParentItems.length > 0) {
          const lastNewParentItem = newParentItems[newParentItems.length - 1];
          const lastIndex = newFlatItems.findIndex(
            (item) => item.id === lastNewParentItem.id
          );
          newFlatItems.splice(lastIndex + 1, 0, ...itemsToMove);
        } else {
          newFlatItems.push(...itemsToMove);
        }

        newFlatItems = updateAllParentGroupOrders(newFlatItems);
      }

      successMessage = `Item moved successfully (Level ${activeItem.level} → ${newLevel})`;
    }

    const newHierarchy = rebuildHierarchy(newFlatItems);

    const updateOrdersRecursively = (items: MenuItem[]): MenuItem[] => {
      return items.map((item, index) => ({
        ...item,
        order: index,
        children: item.children ? updateOrdersRecursively(item.children) : [],
      }));
    };

    const finalHierarchy = updateOrdersRecursively(newHierarchy);
    setCurrentMenu(finalHierarchy);
    message.success(successMessage);
  };

  const isDescendant = (
    parent: FlatMenuItem,
    potentialChild: FlatMenuItem,
    flatItems: FlatMenuItem[]
  ): boolean => {
    const descendants = getDescendants(parent, flatItems);
    return descendants.some(
      (descendant) => descendant.id === potentialChild.id
    );
  };

  const getDescendants = (
    parent: FlatMenuItem,
    flatItems: FlatMenuItem[]
  ): FlatMenuItem[] => {
    const descendants: FlatMenuItem[] = [];
    const children = flatItems.filter((item) => item.parentId === parent.id);

    children.forEach((child) => {
      descendants.push(child);
      descendants.push(...getDescendants(child, flatItems));
    });

    return descendants;
  };

  const updateAllParentGroupOrders = (
    flatItems: FlatMenuItem[]
  ): FlatMenuItem[] => {
    const parentGroups = new Set<string>();

    flatItems.forEach((item) => {
      const parentKey = item.parentId || "root";
      parentGroups.add(parentKey);
    });

    parentGroups.forEach((parentKey) => {
      const groupItems = flatItems.filter(
        (item) => (item.parentId || "root") === parentKey
      );

      groupItems.forEach((item, index) => {
        const itemIndex = flatItems.findIndex(
          (flatItem) => flatItem.id === item.id
        );
        if (itemIndex !== -1) {
          flatItems[itemIndex].order = index;
        }
      });
    });

    return flatItems;
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

    const newHierarchy = rebuildHierarchy(newFlatItems);
    setCurrentMenu(newHierarchy);
    message.success("Item promoted successfully");
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
      if (prevItem.level < item.level) {
        break; // No suitable parent found
      }
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

    const newHierarchy = rebuildHierarchy(newFlatItems);
    setCurrentMenu(newHierarchy);
    message.success("Item demoted successfully");
  };

  const canPromote = (item: FlatMenuItem): boolean => {
    return item.level > 0;
  };

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
          namespace: activeTab === "header" ? "menuHeader" : "menuFooter",
          data: { settings: settingsArray },
        },
        session?.accessToken || "",
        () => setLoading(false),
        () => setLoading(false)
      ) as any
    );
  };

  const processMenuForSave = (items: MenuItem[]): any[] => {
    return items.map((item) => {
      const processed: any = {
        name: item.name,
        slug: item.slug,
      };

      if (item.children && item.children.length > 0) {
        processed.children = processMenuForSave(item.children);
      }

      return processed;
    });
  };

  const renderMenuContent = (menu: MenuItem[], menuType: string) => {
    const flatItems = flattenMenu(menu);

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
              {activeTab === "demo"
                ? "Try Save (Demo Mode)"
                : `Save ${menuType} Menu`}
            </Button>
          </div>
        )}
      </Card>
    );
  };

  const tabItems = [
    {
      key: "header",
      label: "Header Menu",
      children: renderMenuContent(headerMenu, "Header"),
    },
    {
      key: "footer",
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
