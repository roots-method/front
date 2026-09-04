import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Inlines a decorative SVG from /public into the page.
 *
 * Injected, never <img src>, and that is not incidental. Each drawing paints
 * with `currentColor` so it picks up --accent from the page, and each is
 * animated by rules in styles/ (.hero-nodes__pulse, .flow-art__line,
 * .about-art__orbit…). Inside an <img>, currentColor resolves against the
 * SVG's own root and comes out black, and a stylesheet cannot reach into a
 * referenced document — so an <img> silently breaks both.
 *
 * The legacy site fetched these at runtime (svg-inline.js). Reading them on
 * the server instead removes the request waterfall and means the art is in the
 * HTML for crawlers and for anyone without JS.
 *
 * The art is decorative: if the file cannot be read, an empty wrapper is the
 * correct failure, not a crash.
 */
export default async function InlineSvg({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  let markup = "";
  try {
    markup = await readFile(path.join(process.cwd(), "public", src), "utf8");
  } catch {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <div
      className={className ? `${className} is-loaded` : "is-loaded"}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
