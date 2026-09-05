"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE_MENU_ITEMS, isActive } from "@/lib/site";

const SCROLL_THRESHOLD = 48;

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
      {/* Wordmark only — the mark was pulled from the lockup, so .brand__name
          carries the cobalt as the sole brand element in the bar. */}
      <Link className="brand" href="/" aria-label="Arka home">
        <div className="brand__wordmark">
          <span className="brand__name">Arka</span>
        </div>
      </Link>

      <nav className="nav__links" id="primary-nav" aria-label="Primary navigation">
        {items.map((item, i) => (
          <Link
            key={`${item.href}-${i}`}
            className={`nav__link${isActive(item, pathname) ? " is-active" : ""}`}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="nav__tools">
        <Link className="btn btn--primary btn--nav" href="/contact">
          Get Started
        </Link>
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
