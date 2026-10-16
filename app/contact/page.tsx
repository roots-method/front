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
      "Bring the workflow that costs you most. We will help identify the next system worth building.",
    images: [{ url: "/assets/arka-social-card.png", width: 1200, height: 630, alt: "Contact Arka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Arka",
    description: "Bring the workflow that costs you most. We will help identify the next system worth building.",
    images: ["/assets/arka-social-card.png"],
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
    <div className="contact-editorial">
      <section className="contact-editorial__hero" aria-labelledby="contact-title">
        <div className="contact-editorial__intro">
          <p className="contact-editorial__eyebrow">Contact / Start with the workflow</p>
          <h1 id="contact-title">Let’s find the workflow worth fixing first.</h1>
          <p>Tell us where operations feel slow, manual, or unclear. We start by finding the practical business case before recommending a system.</p>
          <div className="contact-editorial__direct">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={BOOKING_URL} target="_blank" rel="noopener">Book a call directly <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="contact-editorial__form-panel"><p className="contact-editorial__form-label">Tell us what should improve</p><ContactForm /></div>
      </section>

      <section className="contact-editorial__next" aria-labelledby="next-title">
        <div><p className="contact-editorial__eyebrow">What happens next</p><h2 id="next-title">A practical conversation, not a pitch.</h2></div>
        <ol>{NEXT_STEPS.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="contact-editorial__perspective" aria-label="Client perspective">
        <p className="contact-editorial__eyebrow">Client perspective</p>
        <blockquote>“The ROI Blueprint alone changed how we think about operations. They found inefficiencies we’d been ignoring for years.”</blockquote>
        <p>David R. / Director of Operations / B2B Technology</p>
      </section>

      <Faq items={FAQS} />
    </div>
  );
}
