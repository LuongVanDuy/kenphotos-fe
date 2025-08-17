"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Tabs,
  Form,
  message,
  Typography,
  Button,
  Input,
  Space,
  Tooltip,
  Modal,
  Row,
  Col,
  List,
  Tag,
  Popconfirm,
  Divider,
} from "antd";
import {
  SaveOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MenuOutlined,
  DragOutlined,
  InfoCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const { Title, Text } = Typography;

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  children?: MenuItem[];
  order: number;
  parentId?: string;
}

interface MenuFormData {
  name: string;
  slug: string;
  children?: MenuItem[];
  order: number;
}

interface FlatMenuItem extends MenuItem {
  level: number;
  parentId?: string;
}

const SortableMenuItem: React.FC<{
  item: FlatMenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onPromote: (id: string) => void;
  onDemote: (id: string) => void;
  canPromote: boolean;
  canDemote: boolean;
}> = ({
  item,
  onEdit,
  onDelete,
  onAddChild,
  onPromote,
  onDemote,
  canPromote,
  canDemote,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Dynamic margin based on level
  const getMarginClass = (level: number) => {
    const margins = {
      0: "",
      1: "ml-6",
      2: "ml-12",
      3: "ml-18",
    };
    return margins[level as keyof typeof margins] || `ml-${level * 6}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-lg p-3 mb-2 ${getMarginClass(
        item.level
      )}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-gray-100 p-1 rounded"
          >
            <DragOutlined className="text-gray-400" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800">{item.name}</div>
            <div className="text-sm text-gray-500">/{item.slug}</div>
            <div className="flex items-center gap-2 mt-1">
              <Tag color="gray">Order: {item.order}</Tag>
              <Tag color="purple">Level: {item.level}</Tag>
              {item.children && item.children.length > 0 && (
                <Tag color="blue">{item.children.length} sub-items</Tag>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Level Controls */}
          <Tooltip title="Promote to higher level">
            <Button
              type="text"
              size="small"
              icon={<ArrowLeftOutlined />}
              onClick={() => onPromote(item.id)}
              disabled={!canPromote}
              className={!canPromote ? "opacity-50" : ""}
            />
          </Tooltip>
          <Tooltip title="Demote to lower level">
            <Button
              type="text"
              size="small"
              icon={<ArrowRightOutlined />}
              onClick={() => onDemote(item.id)}
              disabled={!canDemote}
              className={!canDemote ? "opacity-50" : ""}
            />
          </Tooltip>

          <Divider type="vertical" />

          <Tooltip title="Add sub-menu">
            <Button
              type="text"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => onAddChild(item.id)}
            />
          </Tooltip>
          <Tooltip title="Edit menu item">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(item)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete menu item"
            description="Are you sure you want to delete this menu item and all its children?"
            onConfirm={() => onDelete(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete menu item">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

const MenuForm: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: MenuFormData) => void;
  initialValues?: MenuItem;
  parentId?: string;
}> = ({ visible, onCancel, onSubmit, initialValues, parentId }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        slug: initialValues.slug,
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({
          ...values,
          order: initialValues?.order || 0,
          children: initialValues?.children || [],
        });
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      title={initialValues ? "Edit Menu Item" : "Add Menu Item"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={initialValues ? "Update" : "Add"}
      cancelText="Cancel"
      width={500}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Menu Name"
          rules={[{ required: true, message: "Please enter menu name" }]}
        >
          <Input placeholder="Enter menu name" />
        </Form.Item>
        <Form.Item
          name="slug"
          label="Menu Slug"
          rules={[
            { required: true, message: "Please enter menu slug" },
            {
              pattern: /^[a-z0-9-]+$/,
              message:
                "Slug can only contain lowercase letters, numbers, and hyphens",
            },
          ]}
        >
          <Input placeholder="Enter menu slug (e.g., about-us)" />
        </Form.Item>
        {parentId && (
          <div className="mb-4 p-3 bg-blue-50 rounded">
            <Text type="secondary">
              This item will be added as a sub-menu item.
            </Text>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default function MenuPage() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("demo");
  const [loading, setLoading] = useState(false);
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
  const [demoMenu, setDemoMenu] = useState<MenuItem[]>([
    {
      id: "demo-1",
      name: "Home",
      slug: "home",
      order: 0,
      children: [],
    },
    {
      id: "demo-2",
      name: "Services",
      slug: "services",
      order: 1,
      children: [
        {
          id: "demo-2-1",
          name: "Photo Editing",
          slug: "photo-editing",
          order: 0,
          children: [],
          parentId: "demo-2",
        },
        {
          id: "demo-2-2",
          name: "Video Editing",
          slug: "video-editing",
          order: 1,
          children: [],
          parentId: "demo-2",
        },
        {
          id: "demo-2-3",
          name: "Web Design",
          slug: "web-design",
          order: 2,
          parentId: "demo-2",
          children: [
            {
              id: "demo-2-3-1",
              name: "Landing Pages",
              slug: "landing-pages",
              order: 0,
              children: [],
              parentId: "demo-2-3",
            },
            {
              id: "demo-2-3-2",
              name: "E-commerce",
              slug: "e-commerce",
              order: 1,
              children: [],
              parentId: "demo-2-3",
            },
          ],
        },
      ],
    },
    {
      id: "demo-3",
      name: "About Us",
      slug: "about-us",
      order: 2,
      children: [
        {
          id: "demo-3-1",
          name: "Our Story",
          slug: "our-story",
          order: 0,
          children: [],
          parentId: "demo-3",
        },
        {
          id: "demo-3-2",
          name: "Team",
          slug: "team",
          order: 1,
          children: [],
          parentId: "demo-3",
        },
      ],
    },
    {
      id: "demo-4",
      name: "Blog",
      slug: "blog",
      order: 3,
      children: [],
    },
    {
      id: "demo-5",
      name: "Contact",
      slug: "contact",
      order: 4,
      children: [
        {
          id: "demo-5-1",
          name: "Support",
          slug: "support",
          order: 0,
          children: [],
          parentId: "demo-5",
        },
        {
          id: "demo-5-2",
          name: "Sales",
          slug: "sales",
          order: 1,
          children: [],
          parentId: "demo-5",
        },
      ],
    },
  ]);
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
    if (session?.accessToken && activeTab !== "demo") {
      loadMenuData();
    }
  }, [activeTab, session?.accessToken]);

  const loadMenuData = async () => {
    try {
      setLoading(true);
      const response = await dispatch(
        fetchSetting(activeTab, session?.accessToken || "") as any
      );
      if (response?.payload?.data?.settings) {
        const menuData = response.payload.data.settings.find(
          (s: any) => s.key === "menu"
        );
        if (menuData) {
          const parsedMenu = JSON.parse(menuData.value);
          const processedMenu = processMenuData(parsedMenu);

          if (activeTab === "header") {
            setHeaderMenu(processedMenu || []);
          } else {
            setFooterMenu(processedMenu || []);
          }
        }
      }
    } catch (error) {
      console.error("Error loading menu data:", error);
      if (activeTab === "header") {
        setHeaderMenu([]);
      } else {
        setFooterMenu([]);
      }
    } finally {
      setLoading(false);
    }
  };

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
    return demoMenu;
  };

  const setCurrentMenu = (menu: MenuItem[]) => {
    if (activeTab === "header") {
      setHeaderMenu(menu);
    } else if (activeTab === "footer") {
      setFooterMenu(menu);
    } else {
      setDemoMenu(menu);
    }
  };

  // Flatten menu structure for drag and drop with proper grouping
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
        order: item.order, // Preserve original order
      });
      if (item.children && item.children.length > 0) {
        result.push(...flattenMenu(item.children, level + 1, item.id));
      }
    });

    return result;
  };

  // Rebuild hierarchical structure from flat array
  const rebuildHierarchy = (flatItems: FlatMenuItem[]): MenuItem[] => {
    const itemMap: { [key: string]: MenuItem & { tempChildren: MenuItem[] } } =
      {};
    const result: MenuItem[] = [];

    // Create item map and initialize
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

    // Build hierarchy
    flatItems.forEach((item) => {
      const currentItem = itemMap[item.id];
      if (item.parentId && itemMap[item.parentId]) {
        itemMap[item.parentId].tempChildren.push(currentItem);
      } else if (!item.parentId || item.level === 0) {
        result.push(currentItem);
      }
    });

    // Convert tempChildren to children and sort by order
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

    // Check if we're trying to move a parent into its own descendant
    if (isDescendant(activeItem, overItem, flatItems)) {
      message.warning("Cannot move parent item into its own child");
      return;
    }

    let newFlatItems = [...flatItems];
    let successMessage = "Menu items reordered successfully";

    // Determine the new position and parent
    const activeParentKey = activeItem.parentId || "root";
    const overParentKey = overItem.parentId || "root";

    if (activeParentKey === overParentKey) {
      // Same parent group - simple reordering
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

        // Update order numbers within the group
        reorderedGroup.forEach((item, index) => {
          item.order = index;
        });

        // Rebuild the complete flat array with reordered group
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

        // Update orders for all parent groups to maintain proper sequence
        newFlatItems = updateAllParentGroupOrders(newFlatItems);
      }
    } else {
      // Different parent groups - move to new parent and level
      const newParentId = overItem.parentId;
      const newLevel = overItem.level;

      // Check level limit
      if (newLevel >= 3) {
        message.warning("Cannot move beyond 4 levels deep");
        return;
      }

      // Check if moving descendants would exceed level limit
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

      // Create updated items with new parent and level
      const updateItemAndDescendants = (
        items: FlatMenuItem[]
      ): FlatMenuItem[] => {
        return items.map((item) => {
          if (item.id === activeItem.id) {
            // Update the main item
            return {
              ...item,
              level: newLevel,
              parentId: newParentId,
            };
          } else if (isDescendant(activeItem, item, items)) {
            // Update descendants
            return {
              ...item,
              level: item.level + levelDiff,
            };
          }
          return item;
        });
      };

      // Apply level and parent changes
      newFlatItems = updateItemAndDescendants(flatItems);

      // Now handle the positioning within the new parent group
      // Remove the item(s) from their current positions
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

      // Remove moved items from the flat array
      newFlatItems = newFlatItems.filter((item) => !movedItemIds.has(item.id));

      // Find the correct insertion point in the new parent group
      const overItemInNewParent = newFlatItems.find(
        (item) => item.id === overItem.id
      );

      if (overItemInNewParent) {
        // Find the position of the over item in the flat array
        const insertPosition = newFlatItems.findIndex(
          (item) => item.id === overItem.id
        );

        // Insert moved items at the correct position
        newFlatItems.splice(insertPosition, 0, ...itemsToMove);

        // Update orders for all parent groups to maintain proper sequence
        newFlatItems = updateAllParentGroupOrders(newFlatItems);
      } else {
        // If over item not found, append to the end of new parent group
        const newParentItems = newFlatItems.filter(
          (item) => (item.parentId || "root") === (newParentId || "root")
        );

        if (newParentItems.length > 0) {
          // Find the last item in the new parent group
          const lastNewParentItem = newParentItems[newParentItems.length - 1];
          const lastIndex = newFlatItems.findIndex(
            (item) => item.id === lastNewParentItem.id
          );
          newFlatItems.splice(lastIndex + 1, 0, ...itemsToMove);
        } else {
          // No items in new parent group, add at end
          newFlatItems.push(...itemsToMove);
        }

        // Update orders for all parent groups to maintain proper sequence
        newFlatItems = updateAllParentGroupOrders(newFlatItems);
      }

      successMessage = `Item moved successfully (Level ${activeItem.level} → ${newLevel})`;
    }

    // Rebuild hierarchy and update orders properly
    const newHierarchy = rebuildHierarchy(newFlatItems);

    // Update orders within each parent group to be sequential
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

  // Helper function to update orders for all parent groups
  const updateAllParentGroupOrders = (
    flatItems: FlatMenuItem[]
  ): FlatMenuItem[] => {
    const parentGroups = new Set<string>();

    // Collect all parent groups
    flatItems.forEach((item) => {
      const parentKey = item.parentId || "root";
      parentGroups.add(parentKey);
    });

    // Update orders for each parent group
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

  // Promote item to higher level (reduce indent)
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
        // Find the parent's parent to become the new parent
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

  // Demote item to lower level (increase indent)
  const handleDemote = (itemId: string) => {
    const currentMenu = getCurrentMenu();
    const flatItems = flattenMenu(currentMenu);
    const itemIndex = flatItems.findIndex((i) => i.id === itemId);
    const item = flatItems[itemIndex];

    if (!item || item.level >= 3) {
      // Limit to 4 levels (0,1,2,3)
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

  const handleSaveMenu = async () => {
    try {
      setLoading(true);
      const currentMenu = getCurrentMenu();

      const processedMenu = currentMenu.map((item, index) => ({
        name: item.name,
        slug: item.slug,
        children: processMenuForSave(item.children || []),
        order: index,
      }));

      const settingsArray = JSON.stringify(processedMenu);

      console.log({
        namespace: activeTab,
        data: settingsArray,
      });

      //   await dispatch(
      //     upsertSetting(
      //       {
      //         namespace: activeTab,
      //         data: settingsArray
      //       },
      //       session?.accessToken || "",
      //       () => {
      //         message.success(
      //           `${
      //             activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
      //           } menu saved successfully!`
      //         );
      //         setLoading(false);
      //       },
      //       (error: any) => {
      //         message.error(`Save failed: ${error}`);
      //         setLoading(false);
      //       }
      //     ) as any
      //   );
    } catch (error) {
      message.error("Failed to save menu");
      setLoading(false);
    }
  };

  const processMenuForSave = (items: MenuItem[]): any[] => {
    return items.map((item, index) => ({
      name: item.name,
      slug: item.slug,
      children: item.children ? processMenuForSave(item.children) : [],
      order: index,
    }));
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
      key: "demo",
      label: "Demo",
      children: renderMenuContent(demoMenu, "Demo"),
    },
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
