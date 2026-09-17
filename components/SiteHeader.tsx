"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE_MENU_ITEMS, isActive } from "@/lib/site";

const SCROLL_THRESHOLD = 48;

// The chrome navigates with plain <a>, not next/link, so every menu click is a
// real document load rather than a client-side transition. That is deliberate:
// this is a marketing site of separate documents, and a soft transition swapped
// the page with no browser feedback at all, which read as nothing having
// happened. The cost is real and worth knowing — <a> does not prefetch, so the
// next page starts downloading on click instead of on hover. To go back, import
// Link from next/link and swap these four elements; nothing else depends on it.

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Above 860px the panel is the inline bar again, so an open state left over
  // from a narrow viewport would strand `is-open` on the desktop layout.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // The brand mark is the link home, so Home is dropped from the bar.
  const items = SITE_MENU_ITEMS.filter((item) => item.href !== "/");

  return (
    <header
      className={[
        "nav",
        "nav--ready",
        scrolled ? "nav--scrolled" : "",
        open ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* The mark beside the name set in the site's own type. The logo file is the
          mark alone, so the name is live text rather than part of an image: it
          stays sharp, takes the theme's cobalt, and is real text to a crawler.
          The small-size variant, because at this height the full mark's khaki and
          grey nodes disappear. alt is empty: the link's aria-label names it. */}
      <a className="brand" href="/" aria-label="Arka home">
        <img
          className="brand__mark brand__mark--light"
          src="/assets/arka-mark-small.svg"
          alt=""
          width={30}
          height={30}
        />
        {/* Dark-theme copy of the mark with the blue node lifted; the theme
            shows one or the other. See theme-dark.css. */}
        <img
          className="brand__mark brand__mark--dark"
          src="/assets/arka-mark-small-dark.svg"
          alt=""
          width={30}
          height={30}
        />
        <span className="brand__name">Arka</span>
      </a>

      <nav className="nav__links" id="primary-nav" aria-label="Primary navigation">
        {items.map((item, i) => (
          <a
            key={`${item.href}-${i}`}
            className={`nav__link${isActive(item, pathname) ? " is-active" : ""}`}
            href={item.href}
            /* The load leaves the old page on screen while it works, so closing
               the panel here is the only immediate feedback a tap gets. */
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="nav__tools">
        <a className="btn btn--primary btn--nav" href="/contact">
          Get Started
        </a>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__toggle-bar" aria-hidden="true" />
          <span className="nav__toggle-bar" aria-hidden="true" />
          <span className="nav__toggle-bar" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
