"use client";

import { usePathname } from "next/navigation";
import { BOOKING_URL, CONTACT_EMAIL, SITE_MENU_ITEMS, SOCIAL, isActive } from "@/lib/site";

export default function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="site-footer site-footer--ready">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          {/* Plain <a>, like the header: menu clicks are real document loads.
              See the note at the top of SiteHeader.tsx. */}
          <a className="site-footer__brand-link" href="/" aria-label="Arka home">
            <span className="site-footer__mark">
              <img
                className="site-footer__logo"
                src="/assets/arka-mark-mono-light.svg"
                alt=""
                width={32}
                height={32}
              />
              Arka
            </span>
          </a>
          <p className="site-footer__tagline">
            Building Intelligent Software for Enterprise Operations.
          </p>
        </div>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Menu</h2>
          <nav className="site-footer__menu" aria-label="Footer navigation">
            {SITE_MENU_ITEMS.map((item, i) => (
              <a
                key={`${item.href}-${i}`}
                className={`site-footer__menu-link${isActive(item, pathname) ? " is-active" : ""}`}
                href={item.href}
              >
                {item.label}
              </a>
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
          <a className="btn btn--primary site-footer__inquiry" href="/contact">
            Book a discovery call
            <span className="nav__arrow" aria-hidden="true">
              &#8599;
            </span>
          </a>
        </div>
      </div>

      <div className="site-footer__legal">
        <span>&copy; {new Date().getFullYear()} Arka. All rights reserved.</span>
        <div className="site-footer__legal-actions">
          <button className="site-footer__privacy-link" type="button" data-privacy-modal>
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}
