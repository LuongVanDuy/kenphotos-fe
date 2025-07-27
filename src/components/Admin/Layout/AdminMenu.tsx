import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  PictureOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

export interface MenuItemConfig {
  key: string;
  icon: ReactNode;
  label: string;
  path?: string;
  children?: MenuItemConfig[];
  breadcrumbTitle?: string;
}

export interface BreadcrumbConfig {
  title: string;
  path?: string;
}

// Cấu hình menu chính
export const adminMenuConfig: MenuItemConfig[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/admin",
    breadcrumbTitle: "Dashboard",
  },
  {
    key: "post",
    icon: <FileTextOutlined />,
    label: "Posts",
    breadcrumbTitle: "Posts",
    children: [
      {
        key: "post-list",
        icon: <UnorderedListOutlined />,
        label: "All Posts",
        path: "/admin/post/list",
        breadcrumbTitle: "List",
      },
      {
        key: "post-create",
        icon: <PlusOutlined />,
        label: "Add New",
        path: "/admin/post/create",
        breadcrumbTitle: "Create New",
      },
      {
        key: "post-categories",
        icon: <FolderOutlined />,
        label: "Categories",
        path: "/admin/post/categories",
        breadcrumbTitle: "Categories",
      },
    ],
  },
  {
    key: "media",
    icon: <PictureOutlined />,
    label: "Media",
    breadcrumbTitle: "Media",
    children: [
      {
        key: "media-list",
        icon: <UnorderedListOutlined />,
        label: "Library",
        path: "/admin/media/list",
        breadcrumbTitle: "Library",
      },
      {
        key: "media-create",
        icon: <PlusOutlined />,
        label: "Add New",
        path: "/admin/media/create",
        breadcrumbTitle: "Upload New",
      },
    ],
  },
  {
    key: "user",
    icon: <UserOutlined />,
    label: "Users",
    breadcrumbTitle: "Users",
    children: [
      {
        key: "user-list",
        icon: <UnorderedListOutlined />,
        label: "All Users",
        path: "/admin/user/list",
        breadcrumbTitle: "List",
      },
      {
        key: "user-create",
        icon: <PlusOutlined />,
        label: "Add New",
        path: "/admin/user/create",
        breadcrumbTitle: "Create New",
      },
    ],
  },
  {
    key: "gallery",
    icon: <AppstoreOutlined />,
    label: "Gallery",
    breadcrumbTitle: "Gallery",
    children: [
      {
        key: "gallery-albums",
        icon: <FolderOutlined />,
        label: "Albums",
        path: "/admin/gallery/albums",
        breadcrumbTitle: "Albums",
      },
      {
        key: "gallery-photos",
        icon: <PictureOutlined />,
        label: "Photos",
        path: "/admin/gallery/photos",
        breadcrumbTitle: "Photos",
      },
      {
        key: "gallery-create",
        icon: <PlusOutlined />,
        label: "Create Album",
        path: "/admin/gallery/create",
        breadcrumbTitle: "Create Album",
      },
    ],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    path: "/admin/settings",
    breadcrumbTitle: "Settings",
  },
];

// Cấu hình user menu
export const userMenuConfig = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
    path: "/admin/profile",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
    path: "/admin/settings",
  },
  {
    type: "divider" as const,
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    onClick: () => signOut({ callbackUrl: "/auth/login" }),
  },
];

// Helper functions để xử lý menu động
export class AdminMenuHelper {
  private static flattenMenu(items: MenuItemConfig[]): MenuItemConfig[] {
    const result: MenuItemConfig[] = [];

    items.forEach((item) => {
      result.push(item);
      if (item.children) {
        result.push(...this.flattenMenu(item.children));
      }
    });

    return result;
  }

  // Lấy selected keys dựa trên pathname
  static getSelectedKeys(pathname: string): string[] {
    const flatItems = this.flattenMenu(adminMenuConfig);

    // Tìm exact match trước
    const exactMatch = flatItems.find((item) => item.path === pathname);
    if (exactMatch) {
      return [exactMatch.key];
    }

    // Xử lý các trường hợp edit (highlight parent list)
    if (pathname.includes("/edit/")) {
      const basePath = pathname.split("/edit/")[0];
      const listPath = basePath + "/list";
      const listItem = flatItems.find((item) => item.path === listPath);
      if (listItem) {
        return [listItem.key];
      }
    }

    // Tìm match theo prefix
    const prefixMatch = flatItems
      .filter((item) => item.path && pathname.startsWith(item.path))
      .sort((a, b) => (b.path?.length || 0) - (a.path?.length || 0))[0];

    if (prefixMatch) {
      return [prefixMatch.key];
    }

    return [];
  }

  // Lấy open keys dựa trên pathname
  static getOpenKeys(pathname: string): string[] {
    if (pathname.startsWith("/admin/post")) return ["post"];
    if (pathname.startsWith("/admin/media")) return ["media"];
    if (pathname.startsWith("/admin/user")) return ["user"];
    if (pathname.startsWith("/admin/gallery")) return ["gallery"];
    return [];
  }

  // Tạo breadcrumbs động
  static getBreadcrumbs(pathname: string): BreadcrumbConfig[] {
    const breadcrumbs: BreadcrumbConfig[] = [{ title: "Dashboard", path: "/admin" }];

    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length > 1) {
      const section = pathSegments[1];

      // Tìm section trong menu config
      const sectionConfig = adminMenuConfig.find((item) => item.key === section);
      if (sectionConfig) {
        breadcrumbs.push({
          title: sectionConfig.breadcrumbTitle || sectionConfig.label,
          path: sectionConfig.path,
        });

        // Nếu có action (như list, create)
        if (pathSegments.length > 2) {
          const action = pathSegments[2];
          const actionConfig = sectionConfig.children?.find((child) => child.path?.includes(`/${action}`));

          if (actionConfig) {
            breadcrumbs.push({
              title: actionConfig.breadcrumbTitle || actionConfig.label,
            });
          }
        }
      }
    }

    return breadcrumbs;
  }

  // Convert config thành Ant Design menu items
  static convertToAntdMenuItems(items: MenuItemConfig[], handleNavigation: (path: any) => void): any[] {
    return items.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      onClick: item.path ? () => handleNavigation(item.path) : undefined,
      children: item.children ? this.convertToAntdMenuItems(item.children, handleNavigation) : undefined,
    }));
  }

  // Convert user menu config
  static convertUserMenuToAntd(handleNavigation: (path: string) => void) {
    return userMenuConfig.map((item) => ({
      ...item,
      onClick: item.onClick ?? (item.path ? () => handleNavigation(item.path) : undefined),
    }));
  }
}
