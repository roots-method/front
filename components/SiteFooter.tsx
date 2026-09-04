"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL, CONTACT_EMAIL, SITE_MENU_ITEMS, SOCIAL, isActive } from "@/lib/site";

export default function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="site-footer site-footer--ready">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <Link className="site-footer__brand-link" href="/" aria-label="Arka home">
            <span className="site-footer__mark">
              {/* Masked, not an <img>, so CSS owns the colour: this renders
                  cobalt at 0.25 regardless of the fill in the source file. */}
              <span className="site-footer__logo" aria-hidden="true" />
              Arka
            </span>
          </Link>
          <p className="site-footer__tagline">
            Building Intelligent Software for Enterprise Operations.
          </p>
        </div>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Menu</h2>
          <nav className="site-footer__menu" aria-label="Footer navigation">
            {SITE_MENU_ITEMS.map((item, i) => (
              <Link
                key={`${item.href}-${i}`}
                className={`site-footer__menu-link${isActive(item, pathname) ? " is-active" : ""}`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Contact</h2>
          <ul className="site-footer__list">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <a href={BOOKING_URL} target="_blank" rel="noopener">
                Book a call
                <span className="nav__arrow" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Follow</h2>
          <div className="site-footer__social" aria-label="Social links">
            <a
              className="site-footer__social-link"
              target="_blank"
              rel="noopener"
              href={SOCIAL.linkedin}
              aria-label="LinkedIn"
            >
              <span className="social-icon social-icon--linkedin" aria-hidden="true" />
            </a>
            <a
              className="site-footer__social-link"
              target="_blank"
              rel="noopener"
              href={SOCIAL.x}
              aria-label="X / Twitter"
            >
              <span className="social-icon social-icon--x" aria-hidden="true" />
            </a>
            <a
              className="site-footer__social-link"
              target="_blank"
              rel="noopener"
              href={SOCIAL.github}
              aria-label="GitHub"
            >
              <span className="social-icon social-icon--github" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="site-footer__cta">
          <Link className="btn btn--primary site-footer__inquiry" href="/contact">
            Book a discovery call
            <span className="nav__arrow" aria-hidden="true">
              &#8599;
            </span>
          </Link>
        </div>
      </div>

      <div className="site-footer__legal">
        <span>&copy; {new Date().getFullYear()} Arka. All rights reserved.</span>
        <button className="site-footer__privacy-link" type="button" data-privacy-modal>
          Privacy Policy
        </button>
      </div>
    </footer>
  );
}
