export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  children?: MenuItem[];
  order: number;
  parentId?: string;
}

export interface FlatMenuItem extends MenuItem {
  level: number;
  parentId?: string;
}

// Utility functions
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getMarginClass = (level: number) => {
  const margins = {
    0: "",
    1: "ml-6",
    2: "ml-12",
    3: "ml-18",
  };
  return margins[level as keyof typeof margins] || `ml-${level * 6}`;
};

// Menu processing utilities
export const processMenuData = (menu: any[]): MenuItem[] => {
  if (!Array.isArray(menu)) {
    return [];
  }

  return menu.map((item: any, index: number) => {
    const id = item.id || generateId();
    return {
      id,
      name: item.name || "",
      slug: item.slug || "",
      children: item.children ? processChildrenData(item.children, id) : [],
      order: item.order !== undefined ? item.order : index,
    };
  });
};

export const processChildrenData = (
  children: any[],
  parentId: string
): MenuItem[] => {
  if (!Array.isArray(children)) {
    return [];
  }

  return children.map((child: any, childIndex: number) => {
    const childId = child.id || generateId();
    return {
      id: childId,
      name: child.name || "",
      slug: child.slug || "",
      children: child.children
        ? processChildrenData(child.children, childId)
        : [],
      order: child.order !== undefined ? child.order : childIndex,
      parentId: parentId,
    };
  });
};

export const processMenuForSave = (items: MenuItem[]): any[] => {
  return items.map((item, index) => ({
    name: item.name,
    slug: item.slug,
    children: item.children ? processMenuForSave(item.children) : [],
    order: index,
  }));
};

// Hierarchy utilities
export const flattenMenu = (
  items: MenuItem[],
  level: number = 0,
  parentId?: string
): FlatMenuItem[] => {
  const result: FlatMenuItem[] = [];
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  sortedItems.forEach((item) => {
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

export const rebuildHierarchy = (flatItems: FlatMenuItem[]): MenuItem[] => {
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

  // Build hierarchy - preserve the order from flatItems array
  flatItems.forEach((item) => {
    const currentItem = itemMap[item.id];
    if (item.parentId && itemMap[item.parentId]) {
      itemMap[item.parentId].tempChildren.push(currentItem);
    } else if (!item.parentId || item.level === 0) {
      result.push(currentItem);
    }
  });

  // Convert tempChildren to children and maintain order from flatItems
  Object.values(itemMap).forEach((item) => {
    item.children = item.tempChildren.sort((a, b) => {
      const aIndex = flatItems.findIndex((fi) => fi.id === a.id);
      const bIndex = flatItems.findIndex((fi) => fi.id === b.id);
      return aIndex - bIndex;
    });
    delete (item as any).tempChildren;
  });

  // Sort root items by their appearance order in flatItems
  return result.sort((a, b) => {
    const aIndex = flatItems.findIndex((fi) => fi.id === a.id);
    const bIndex = flatItems.findIndex((fi) => fi.id === b.id);
    return aIndex - bIndex;
  });
};

export const normalizeOrdersRecursively = (items: MenuItem[]): MenuItem[] => {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  return sortedItems.map((item, index) => ({
    ...item,
    order: index,
    children:
      item.children && item.children.length > 0
        ? normalizeOrdersRecursively(item.children)
        : [],
  }));
};

// Drag and drop utilities
export const isDescendant = (
  parent: FlatMenuItem,
  potentialChild: FlatMenuItem,
  flatItems: FlatMenuItem[]
): boolean => {
  const descendants = getDescendants(parent, flatItems);
  return descendants.some((descendant) => descendant.id === potentialChild.id);
};

export const getDescendants = (
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

export const updateAllParentGroupOrders = (
  flatItems: FlatMenuItem[]
): FlatMenuItem[] => {
  const parentGroups = new Set<string>();
  const updatedFlatItems = [...flatItems];

  // Collect all parent groups
  updatedFlatItems.forEach((item) => {
    const parentKey = item.parentId || "root";
    parentGroups.add(parentKey);
  });

  // Update orders for each parent group
  parentGroups.forEach((parentKey) => {
    const groupItems = updatedFlatItems
      .filter((item) => (item.parentId || "root") === parentKey)
      .sort((a, b) => {
        const aIndex = updatedFlatItems.findIndex((fi) => fi.id === a.id);
        const bIndex = updatedFlatItems.findIndex((fi) => fi.id === b.id);
        return aIndex - bIndex;
      });

    groupItems.forEach((item, index) => {
      const itemIndex = updatedFlatItems.findIndex(
        (flatItem) => flatItem.id === item.id
      );
      if (itemIndex !== -1) {
        updatedFlatItems[itemIndex].order = index;
      }
    });
  });

  return updatedFlatItems;
};
