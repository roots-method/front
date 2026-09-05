import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: find the workflow worth fixing first",
  description:
    "Tell us where operations feel slow, manual, or unclear. We start by finding the practical business case before recommending a system. We respond within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Contact Arka",
    description:
      "Tell us where operations feel slow, manual, or unclear. We respond within one business day.",
  },
};

const NEXT_STEPS = [
  "We review your inquiry and identify the most relevant angle within one business day",
  "We reach out to schedule a 30-min scoping call. No commitment required",
  "Together we scope the highest-value workflow opportunity and outline a path forward",
];

const FAQS = [
  {
    q: "What does the ROI Blueprint actually deliver?",
    a: "A ranked list of automation opportunities with projected cost savings and implementation timelines for each. You leave weeks 1–2 with a prioritized plan, not a vague proposal.",
  },
  {
    q: "How long until we see results?",
    a: "First automation systems are live within 6–8 weeks of starting the engagement. The ROI Blueprint in weeks 1–2 gives you the business case before any build begins.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "Yes, we work with enterprise teams globally. Our engagements run remotely and accommodate operations across time zones and jurisdictions.",
  },
  {
    q: "What happens if the system needs changes after launch?",
    a: "We don't hand off and disappear. Back-Office Operations covers ongoing maintenance, optimization, and improvements, so the system keeps getting better as your workflows evolve.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="contact-page">
        <div className="contact-info">
          <div className="contact-info__hero">
            <p className="eyebrow">
              <img className="icon-sm" src="/assets/icons-ai-ibm/send.svg" alt="" />
              Contact
            </p>
            <h1>Let&rsquo;s find the workflow worth fixing first.</h1>
            <p className="contact-info__lede">
              Tell us where operations feel slow, manual, or unclear. We start by finding the
              practical business case before recommending a system.
            </p>
          </div>

          <div className="contact-next">
            <p className="contact-next__heading">What happens next</p>
            <ol className="contact-next__steps">
              {NEXT_STEPS.map((step, i) => (
                <li key={step}>
                  <span className="contact-next__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="contact-next__text">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <blockquote className="contact-quote">
            <p className="contact-quote__text">
              &ldquo;The ROI Blueprint alone changed how we think about operations. They found
              inefficiencies we&rsquo;d been ignoring for years.&rdquo;
            </p>
            <footer className="contact-quote__footer">
              <span className="contact-quote__name">David R.</span>
              <span className="contact-quote__role">
                Director of Operations &middot; B2B Technology
              </span>
            </footer>
          </blockquote>

          <div className="contact-direct">
            <a className="contact-direct__link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <a className="contact-direct__link" href={BOOKING_URL} target="_blank" rel="noopener">
              Book a call directly
              <span className="nav__arrow" aria-hidden="true">
                &#8599;
              </span>
            </a>
          </div>
        </div>

        <div className="contact-form-wrap">
          <ContactForm />
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
