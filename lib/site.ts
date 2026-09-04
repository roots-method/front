export const SITE_URL = "https://www.arkaflow.co";
export const CONTACT_EMAIL = "build@arkaflow.co";
export const BOOKING_URL = "https://calendar.notion.so/meet/sumit-ntn/arka";

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/dhee-node/?viewAsMember=true",
  x: "https://x.com/_jazoo",
  github: "https://github.com/roots-method",
} as const;

export type MenuItem = {
  href: string;
  label: string;
  /** Two entries share /contact; without this both would light up at once. */
  noActive?: boolean;
};

/**
 * The whole nav. Case Work, Our Flow and Blog stay out of it for now — those
 * routes are still built and still in the sitemap, just not linked. To bring
 * one back, restore its entry here:
 *
 *   { href: "/our-flow", label: "Our Flow" }
 *   { href: "/blog",     label: "Blog" }
 *   { href: "/results",  label: "Case Work" }
 *
 * The activePage aliases below are kept so each section resolves the moment it
 * is restored.
 */
export const SITE_MENU_ITEMS: MenuItem[] = [
  { href: "/", label: "Home" },
  { href: "/software", label: "Software" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Support", noActive: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Which menu entry renders active for a given path. Detail pages live under
 * their own routes, so they alias to their index:
 *   /case-study   -> /results
 *   /blog/<slug>  -> /blog
 */
export function activePage(pathname: string): string {
  if (pathname === "/case-study") return "/results";
  if (pathname.startsWith("/blog/")) return "/blog";
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export function isActive(item: MenuItem, pathname: string): boolean {
  return !item.noActive && item.href === activePage(pathname);
}
