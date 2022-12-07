export interface Menu {
  title: string;
  href: string;
}

/**
 * Menus used on the AppBar
 */
export const menus: Menu[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Trending",
    href: "/trending",
  },
  {
    title: "Top 100",
    href: "/top100",
  },
  {
    title: "New",
    href: "/new",
  },
];
