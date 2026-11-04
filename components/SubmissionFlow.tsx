const LAYERS = [
  { title: "Submission request", detail: "Web form · Email · Fax · WhatsApp", kind: "source" },
  { title: "AI intake assistant", detail: "Classifies the pack, proposes source-grounded facts, and requests an approved capability", kind: "ai" },
  { title: "MCP tool / API adapter", detail: "Exposes only permitted intake and retrieval capabilities", kind: "adapter" },
  { title: "Submission intake API", detail: "Authorization · Validation · Idempotency · Audit", kind: "api" },
  { title: "Underwriting workspace", detail: "Stores the source pack, applies rules, and assigns a reviewable work item", kind: "system" },
];

export default function SubmissionFlow() {
  return (
    <figure className="submission-flow" aria-labelledby="submission-flow-title">
      <figcaption>
        <span>Conceptual architecture</span>
        <strong id="submission-flow-title">From a submission request to a guarded underwriting work item.</strong>
      </figcaption>
      <p className="submission-flow__example">Example: a broker sends a commercial insurance submission.</p>
      <ol>
        {LAYERS.map((layer, index) => (
          <li className={`submission-flow__node submission-flow__node--${layer.kind}`} key={layer.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <b>{layer.title}</b>
            <p>{layer.detail}</p>
          </li>
        ))}
      </ol>
      <p className="submission-flow__note">The API and rules layer remains responsible for authorization, validation, audit, and all underwriting decisions.</p>
    </figure>
  );
}
