import { readFile } from "node:fs/promises";
import path from "node:path";

export type PostSection = {
  heading: string;
  /** Prose HTML: paragraphs, lists, inline em/strong/links. */
  html: string;
};

export type PostContent = {
  slug: string;
  summary: string;
  /** [date, read time, author] as the byline renders them. */
  meta: string[];
  sections: PostSection[];
  /** Anything after the last section — a closing note, usually. */
  tail: string;
};

/**
 * Post prose lives in content/blog/<slug>.json rather than in JSX. The bodies
 * are long-form editorial with inline markup throughout; hand-transcribing them
 * into JSX would risk silent typos in every paragraph for no structural gain.
 * The page shell, nav and metadata are React — only the prose is content.
 *
 * Read on the server, so the HTML ships in the response for crawlers.
 */
export async function getPostContent(slug: string): Promise<PostContent | null> {
  try {
    const file = await readFile(
      path.join(process.cwd(), "content", "blog", `${slug}.json`),
      "utf8",
    );
    return JSON.parse(file) as PostContent;
  } catch {
    return null;
  }
}
