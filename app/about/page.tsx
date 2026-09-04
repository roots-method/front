import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/CtaPanel";
import InlineSvg from "@/components/InlineSvg";

export const metadata: Metadata = {
  title: "About — practitioners, not consultants",
  description:
    "Arka builds intelligent software for enterprise operations — replacing manual, fragmented workflows with AI systems that improve execution, sharpen margins, and compound in value over time.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Arka",
    description:
      "Systems that keep working. Partnerships that keep going. Meet the team behind Arka.",
  },
};

const STATS = [
  { value: "37", label: "Clients & counting" },
  { value: "425", label: "Projects of experience" },
  { value: "20", label: "Years of industry experience" },
];

const TEAM = [
  {
    photo: "AMaheshwari.png",
    first: "Vijaya",
    last: "Nikant",
    title: "VP of Engineering & Strategy",
    bio: "15 years building and scaling operations systems across logistics, finance, and B2B technology.",
  },
  {
    photo: "AkkiMahesh.png",
    first: "Akki",
    last: "Maheshwari",
    title: "Head of Brand & People",
    bio: "Shapes how Arka communicates and grows — connecting brand clarity with the talent that delivers it.",
  },
  {
    photo: "SJazzy.png",
    first: "Pankaj",
    last: "Jaju",
    title: "Director of Technology & Operations",
    bio: "Leads the technical architecture of every engagement — from workflow design through long-term system performance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="page-hero__main">
          <p className="eyebrow">
            <img className="icon-sm" src="/assets/icons-ai-ibm/collaborate.svg" alt="" />
            Company
          </p>
          <h1>
            <span className="about-hero__line">
              Systems that <em>keep working.</em>
            </span>{" "}
            {/* .accent draws an absolutely positioned underline anchored to the
                element's box, so on a phrase that wraps it lands under the last
                line only. Use .accent--alt for anything multi-line. */}
            <span className="about-hero__line accent">Partnerships that keep going.</span>
          </h1>
          <p className="page-hero__tagline">
            Arka builds intelligent software for enterprise operations — replacing manual,
            fragmented workflows with AI systems that improve execution, sharpen margins, and
            compound in value over time.
          </p>
        </div>

        {/* A steady core with orbits that keep turning: the page's claim drawn
            rather than stated. Rings draw in, then rotate indefinitely. */}
        <InlineSvg src="/assets/art/about-art.svg" className="about-art" />
      </section>

      <section className="about-mission">
        <div className="about-mission__col">
          <p className="about-mission__label">Mission</p>
          <p className="about-mission__text">
            To help enterprises adopt digital workflows that improve business revenue — delivering
            practical, measurable change in today&rsquo;s competitive global market
          </p>
        </div>
        <div className="about-mission__divider" aria-hidden="true" />
        <div className="about-mission__col">
          <p className="about-mission__label">Vision</p>
          <p className="about-mission__text">
            To become pioneers of the next generation digital ecosystem building the systems that
            lets enterprises operate with clarity, speed, and intelligence.
          </p>
        </div>
      </section>

      <section className="about-story">
        <header className="about-story__header">
          <p className="eyebrow">Our Story</p>
          <h2>Built from the frustration of watching capable teams move slowly.</h2>
        </header>
        <div className="about-story__body">
          <p>
            Arka began with a simple idea: modern tools should make work feel easier, not heavier.
            We kept seeing capable teams slowed by disconnected workflows and processes that added
            friction instead of focus.
          </p>
          <p>
            We partner with enterprise businesses to see where time and margin quietly slip away,
            then design systems that make better execution
          </p>
          <p>
            We blend thoughtful automation with human judgment, and stay close from design through
            deployment. When people, process, and tools align, improvement compounds over time.
          </p>
          <p>
            We build systems that let companies move faster, decide better, and keep improving
            without us in the room.
          </p>
        </div>
      </section>

      <section className="about-stats" aria-label="Arka in numbers">
        {STATS.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 ? <div className="about-stats__divider" aria-hidden="true" /> : null}
            <div className="about-stats__item">
              {/* Ochre is reserved for numbers; these are the numbers. */}
              <span className="about-stats__value">{stat.value}</span>
              <span className="about-stats__label">{stat.label}</span>
            </div>
          </Fragment>
        ))}
      </section>

      <section className="about-team">
        <header className="about-team__header">
          <p className="eyebrow">The Team</p>
          <h2>People who&rsquo;ve done the work.</h2>
          <p className="about-team__sub">
            Not consultants who recommend. Practitioners who build, deploy, and own outcomes.
          </p>
        </header>
        <div className="about-team__grid">
          {TEAM.map((member) => (
            <article className="team-card reveal" key={member.photo}>
              <div className="team-card__photo">
                <img
                  src={`/assets/avatars/${member.photo}`}
                  alt={`${member.first} ${member.last}`}
                  loading="lazy"
                />
              </div>
              <div className="team-card__body">
                <h3 className="team-card__name">
                  {member.first} <em>{member.last}</em>
                </h3>
                <p className="team-card__title">{member.title}</p>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaPanel
        eyebrow="Work With Us"
        heading="If your operations have room to improve, we'll find it."
        primaryLabel="Book a discovery call"
        watermark={false}
        secondary={
          <Link className="btn btn--ghost" href="/software">
            How we work
          </Link>
        }
      />
    </>
  );
}
