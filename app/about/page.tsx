import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About: practitioners, not consultants",
  description:
    "Arka builds intelligent software for enterprise operations, replacing manual, fragmented workflows with AI systems that improve execution, sharpen margins, and compound in value over time.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Arka",
    description:
      "Systems that keep working. Partnerships built around the people who run them.",
    images: [{ url: "/assets/arka-social-card.png", width: 1200, height: 630, alt: "About Arka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Arka",
    description: "Systems that keep working. Partnerships built around the people who run them.",
    images: ["/assets/arka-social-card.png"],
  },
};

const STATS = [
  { value: "37", label: "Clients & counting" },
  { value: "425", label: "Projects of experience" },
  { value: "20", label: "Years of industry experience" },
];

const TEAM = [
  {
    first: "Vijaya",
    last: "Nikant",
    title: "VP of Engineering & Strategy",
    bio: "15 years building and scaling operations systems across logistics, finance, and B2B technology.",
  },
  {
    first: "Akki",
    last: "Maheshwari",
    title: "Head of Brand & People",
    bio: "Shapes how Arka communicates and grows, connecting brand clarity with the talent that delivers it.",
  },
  {
    first: "Pankaj",
    last: "Jaju",
    title: "Director of Technology & Operations",
    bio: "Leads the technical architecture of every engagement, from workflow design through long-term system performance.",
  },
];

export default function AboutPage() {
  return (
    <div className="about-editorial">
      <section className="about-editorial__hero" aria-labelledby="about-title">
        <div><p className="about-editorial__eyebrow">Company / Arka</p><h1 id="about-title">Systems that keep working. Partnerships that keep going.</h1><p>Arka builds intelligent software for enterprise operations—replacing manual, fragmented workflows with AI systems that improve execution, sharpen margins, and compound in value over time.</p></div>
        <div className="about-editorial__hero-art" aria-hidden="true"><span /><span /><span /><small>03 / ABOUT</small></div>
      </section>

      <section className="about-editorial__mission">
        <article><p className="about-editorial__eyebrow">Mission</p><p>To help enterprises adopt digital workflows that improve business revenue, delivering practical, measurable change in today’s competitive global market.</p></article>
        <article><p className="about-editorial__eyebrow">Vision</p><p>To become pioneers of the next-generation digital ecosystem, building systems that let enterprises operate with clarity, speed, and intelligence.</p></article>
      </section>

      <section className="about-editorial__story">
        <header><p className="about-editorial__eyebrow">Our story</p><h2>Complex ideas need simple solutions.</h2></header>
        <div>
          <p>
            Arka began with a simple idea: modern tools should make work feel easier, not heavier.
            We kept seeing capable teams slowed by disconnected workflows and processes that added
            friction instead of focus.
          </p>
          <p>
            We partner with every scale of businesses, be it your small venture or you are ready to scale and with large scale enterprises. We genuinely see where time and margin quietly slip away,
            then design simple solutions that make better execution.
          </p>
          <p>
            We blend meaningful automation with human judgment, and stay close from design through
            deployment. When people, process, and tools align, improvement compounds over time.
          </p>
          <p>
            We build systems that let companies move faster, decide better, and more importantly keep them simple.
          </p>
        </div>
      </section>

      <section className="about-editorial__stats" aria-label="Arka in numbers">
        {STATS.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>

      <section className="about-editorial__team" aria-labelledby="team-title">
        <header>
          <p className="about-editorial__eyebrow">The team</p>
          <h2 id="team-title">People who&rsquo;ve done the work.</h2>
          <p>
            Not consultants who recommend. Practitioners who build, deploy, and own outcomes.
          </p>
        </header>
        <div className="about-editorial__team-grid">
          {TEAM.map((member, index) => (
            <article key={`${member.first}-${member.last}`}>
              <span>0{index + 1}</span>
              <div><h3>{member.first} {member.last}</h3><p className="about-editorial__team-title">{member.title}</p><p>{member.bio}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-editorial__closing" aria-labelledby="about-closing-title"><p className="about-editorial__eyebrow">Work with us</p><h2 id="about-closing-title">If your operations have room to improve, we’ll find it.</h2><div><a href={BOOKING_URL} target="_blank" rel="noopener">Schedule a call <span aria-hidden="true">↗</span></a><Link href="/software">How we work <span aria-hidden="true">→</span></Link></div></section>
    </div>
  );
}
