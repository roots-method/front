/**
 * Case study content. Two exports, the same split the old case-studies.js had:
 * an ordered list of slugs and a keyed object of the studies themselves.
 *
 * Adding one: add the slug to CASE_STUDY_ORDER and the object to CASE_STUDIES.
 * The object can retain a draft or reference study while its slug is absent
 * from CASE_STUDY_ORDER. Only ordered studies are public: /results, the
 * sitemap, related work, and direct case-study URLs all respect that list.
 */

export type CaseMetric = { value: string; label: string };

export type CaseBarChart = {
  title: string;
  description: string;
  max: number;
  rows: Array<{ label: string; estimated: number; actual: number }>;
};

export type CaseScenarioTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type CaseSection = {
  heading: string;
  paragraphs: string[];
  /** Bulleted points under the paragraphs. */
  list?: string[];
  /** Root-absolute path into /public. */
  diagram?: string;
  diagramAlt?: string;
  chart?: CaseBarChart;
  scenarioTable?: CaseScenarioTable;
  flow?: "appointment-operations" | "insurance-submission";
};

export type CaseStudy = {
  slug: string;
  /** Per-study tint; the article reads it through --case-accent. */
  accent: string;
  label: string;
  title: string;
  summary: string;
  teaser: string;
  readTime: string;
  engagement: string;
  metrics: CaseMetric[];
  sections: CaseSection[];
};

export const CASE_STUDY_ORDER: string[] = [
  "appointment-intake-operations",
  "insurance-submission-intake",
  "multi-office-advisory-firm",
  "onboarding-success-platform",
  "agricultural-export-cooperative"
];

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "agentic-noc-automation": {
    "slug": "agentic-noc-automation",
    "accent": "#a8a4e0",
    "label": "Insurance · Underwriting",
    "title": "Agentic notice-of-cancellation automation",
    "summary": "A mid-size P&C carrier was processing notice-of-cancellation cases through manual review and static rule engines capping throughput and burying underwriting and accounting staff in decisions that didn't need human judgment.",
    "teaser": "A mid-size P&C carrier was processing notice-of-cancellation cases through manual review and static rule engines. We built a multi-agent system with a confidence-based escalation gate that resolves the majority of cases autonomously and routes the rest to underwriters with full reasoning attached.",
    "readTime": "8 min read",
    "engagement": "Phased rollout",
    "metrics": [
      {
        "value": "3 agents",
        "label": "Specialist decision agents in production"
      },
      {
        "value": "Phase 3",
        "label": "Reinstatement and accounting reconciliation"
      },
      {
        "value": "0",
        "label": "Compliance violations at go-live"
      }
    ],
    "sections": [
      {
        "heading": "The challenge",
        "paragraphs": [
          "Notice of cancellation is one of the highest-volume, most regulation-bound workflows in property and casualty insurance. Every case touches policy administration, billing, document generation, and accounting over a multi-day lifecycle with notice periods and required disclosures that vary by state, line of business, and cancellation reason.",
          "The carrier was running this on manual review and static rule engines. Staff in underwriting and accounting spent significant time on cases where the right answer was clear-cut and computable non-payment with no payment history exceptions, straightforward risk deterioration, clean refund calculations. That left less capacity for the cases that actually required judgment: ambiguous fraud indicators, reinstatement edge cases, multi-factor risk situations where context mattered."
        ]
      },
      {
        "heading": "Why this needed agents, not another rule engine",
        "paragraphs": [
          "Static rule engines handle binary conditions well. NOC is not binary. A cancellation for risk deterioration may involve conflicting signals a good payment history, a borderline inspection result, a market condition that changes how underwriters weigh evidence. Rule engines can't weigh ambiguous, multi-factor evidence. Agents can.",
          "The volume also made this a natural fit: non-payment, risk change, and fraud triggers generate a steady, predictable case stream rather than one-off events. That steady stream is exactly what an agentic system is built for."
        ]
      },
      {
        "heading": "What we built",
        "paragraphs": [
          "We designed a four-tier architecture: a trigger layer that detects non-payment, risk change, or fraud events; an orchestrator agent that tracks case lifecycle state and routes to the right specialists; three decision agents that each form an independent judgment and score their own confidence; and a confidence gate that determines whether a case executes autonomously or escalates to a human reviewer.",
          "The three specialist agents each own a distinct domain. The risk agent weighs evidence of risk deterioration across policy history, inspection data, and market signals. The exception agent handles reinstatement requests—payment disputes, grace period questions, customer-initiated reversals. The ledger agent calculates premium adjustments and refunds based on the verified cancellation date and policy terms.",
          "Regulatory facts—notice periods, required disclosure language, state-specific rules—stay in a deterministic rules layer. Agents reason over risk and exceptions, not over legal validity. That separation kept the compliance surface clean and auditable."
        ],
        "diagram": "/assets/case-work/noc_agentic_architecture_v2.svg",
        "diagramAlt": "Architecture diagram showing trigger event flowing to orchestrator agent, fanning out to risk, exception, and ledger agents, converging on a confidence gate that routes to autonomous execution or human escalation"
      },
      {
        "heading": "The confidence gate",
        "paragraphs": [
          "The core mechanism is confidence-based routing rather than rule-based routing. Each decision agent scores its own certainty alongside its recommendation. High-confidence cases—where evidence is clear, policy terms are unambiguous, and no exception flags are raised—execute autonomously. The agent routes anything it judges ambiguous to an underwriter or compliance reviewer, with its full reasoning trace attached so the reviewer can act immediately rather than reconstruct the case.",
          "The escalation threshold started conservative in Phase 1 and tightened as case outcomes were reviewed and fed back into calibration. This gave the carrier a clear audit trail and a way to increase autonomous resolution incrementally without changing the underlying architecture."
        ]
      },
      {
        "heading": "Phased rollout",
        "paragraphs": [
          "We structured the rollout in two live phases to manage regulatory exposure and build internal confidence in the system before expanding scope. Phase 1 covered non-payment cancellations — the highest-volume, most structured case type — with autonomous execution for high-confidence cases and escalation for everything else.",
          "Phase 2 extended to underwriting-reason cancellations, with mandatory human sign-off regardless of confidence score during an initial audit period. A third phase covering reinstatement processing and full accounting reconciliation via a dedicated ledger agent is planned once the Phase 1 and 2 audit review is complete."
        ],
        "list": [
          "Phase 1 (live): Non-payment cancellations — autonomous execution for high-confidence, escalate low-confidence",
          "Phase 2 (live): Underwriting-reason cancellations — mandatory underwriter sign-off throughout initial period",
          "Phase 3 (planned): Reinstatement and accounting reconciliation — pending Phase 1–2 audit outcomes"
        ]
      },
      {
        "heading": "Results and conclusion",
        "paragraphs": [
          "The Phase 1 deployment resolved the majority of non-payment cancellations without underwriter involvement, materially reducing per-case handling time and freeing the operations team from decisions that didn't require their judgment. Staff previously absorbed by routine NOC review were redirected to fraud indicators, borderline reinstatements, and multi-factor risk situations — work where their expertise compounds rather than gets consumed by process.",
          "Phase 2 is building the audit dataset that will allow the confidence threshold to tighten further, increasing autonomous resolution across underwriting-reason cases without relaxing compliance controls. At current volumes, the two live phases are on track to eliminate a significant share of manual NOC handling while maintaining a full audit trail and human oversight on every ambiguous case."
        ]
      },
      {
        "heading": "What stayed human",
        "paragraphs": [
          "Underwriting-reason cancellations in Phase 2 required human sign-off regardless of agent confidence—a deliberate choice to accumulate a reviewed dataset before increasing autonomy in the most judgment-heavy case type. In all phases, low-confidence escalations route to underwriters or compliance reviewers with the full agent reasoning trace.",
          "The system was designed so that the humans handling escalations are doing higher-value work: reviewing edge cases with context already assembled, not re-entering data or reconstructing case history from scattered systems."
        ]
      }
    ]
  },
  "multi-office-advisory-firm": {
    "slug": "multi-office-advisory-firm",
    "accent": "#c4bda5",
    "label": "Finance · Professional services",
    "title": "Multi-office advisory firm",
    "summary": "Month-end reporting consumed two full weeks across four locations. Arka standardized data capture, introduced approval checkpoints, and layered in light automation for recurring reconciliations.",
    "teaser": "Month-end reporting consumed two full weeks across four locations. Arka standardized data capture, introduced approval checkpoints, and layered in light automation for recurring reconciliations freeing analysts to focus on review instead of assembly.",
    "readTime": "7 min read",
    "engagement": "18-week engagement",
    "metrics": [
      {
        "value": "9 days",
        "label": "Saved on month-end close"
      },
      {
        "value": "4",
        "label": "Offices on one reporting rhythm"
      },
      {
        "value": "62%",
        "label": "Less manual assembly time"
      }
    ],
    "sections": [
      {
        "heading": "The challenge",
        "paragraphs": [
          "A multi-office advisory firm closed books across four locations with slightly different spreadsheet templates, local naming conventions, and approval habits. Month-end reporting took two full weeks—mostly assembly, not analysis.",
          "Partners wanted consistent visibility into utilization and margin by practice area, but each office exported data differently. Analysts became translators between systems instead of reviewers of performance."
        ]
      },
      {
        "heading": "What we did",
        "paragraphs": [
          "We treated reporting as a workflow problem first. Before adding automation, we aligned how each office captured time, expenses, and work-in-progress so downstream steps could trust the inputs."
        ],
        "list": [
          "Standardized data capture templates and field definitions across offices",
          "Designed approval checkpoints with clear ownership before consolidation",
          "Automated recurring reconciliations and variance flagging for analysts",
          "Built a leadership dashboard tied to the same definitions used in close"
        ]
      },
      {
        "heading": "Results",
        "paragraphs": [
          "Month-end assembly time dropped by more than half. Analysts reclaimed nearly two days per close cycle for review and commentary instead of copy-paste reconciliation.",
          "Leadership now receives a consistent weekly snapshot using the same metrics that feed the formal close—reducing surprises when numbers shift at month end."
        ]
      },
      {
        "heading": "How it compounds",
        "paragraphs": [
          "With a stable reporting backbone in place, the firm is extending the same workflow patterns to client profitability views and partner compensation modeling without rebuilding from scratch each quarter."
        ]
      }
    ]
  },
  "direct-to-consumer-retailer": {
    "slug": "direct-to-consumer-retailer",
    "accent": "#9dc5be",
    "label": "Growth · Consumer brand",
    "title": "Direct-to-consumer retailer",
    "summary": "Inventory, fulfillment, and customer support ran on parallel spreadsheets. We designed a connected workflow with clearer ownership, automated low-risk decisions, and a dashboard the leadership team could trust.",
    "teaser": "Inventory, fulfillment, and customer support ran on parallel spreadsheets. We designed a connected workflow with clearer ownership, automated low-risk decisions, and a dashboard the leadership team could trust for weekly planning.",
    "readTime": "6 min read",
    "engagement": "12-week engagement",
    "metrics": [
      {
        "value": "40%",
        "label": "Fewer stockout escalations"
      },
      {
        "value": "3",
        "label": "Teams on one planning view"
      },
      {
        "value": "2×",
        "label": "Faster weekly planning cadence"
      }
    ],
    "sections": [
      {
        "heading": "The challenge",
        "paragraphs": [
          "A growing DTC brand had outgrown its spreadsheet stack. Inventory planners, fulfillment coordinators, and support leads each maintained their own version of truth. Weekly planning meetings started with reconciliation, not decisions.",
          "Promotional spikes exposed the gaps quickly: support could not see inbound restocks, and fulfillment commitments were made without reliable inventory signals."
        ]
      },
      {
        "heading": "What we did",
        "paragraphs": [
          "We connected the workflows that drive customer promise—available inventory, fulfillment capacity, and support backlog—into a single operating rhythm with explicit owners at each step."
        ],
        "list": [
          "Mapped decision rights for replenishment, allocation, and exception handling",
          "Automated low-risk reorder and routing rules with human override paths",
          "Linked support ticket trends to inventory and fulfillment signals",
          "Delivered a leadership dashboard refreshed on a cadence the team could trust"
        ]
      },
      {
        "heading": "Results",
        "paragraphs": [
          "Stockout escalations dropped materially during the next two promotional cycles. Weekly planning moved from a half-day reconciliation exercise to a focused ninety-minute review.",
          "Support, fulfillment, and merchandising now reference the same numbers when discussing customer impact—reducing cross-functional friction during peak periods."
        ]
      },
      {
        "heading": "What changed culturally",
        "paragraphs": [
          "The biggest shift was clarity of ownership. When a metric moved, teams knew which workflow to inspect instead of debating whose spreadsheet was correct."
        ]
      }
    ]
  },
  "onboarding-success-platform": {
    "slug": "onboarding-success-platform",
    "accent": "#a7bbc0",
    "label": "A classic enterprise tech health backlog",
    "title": "How AI accelerated Application Migration",
    "summary": "A 2014-era Spring MVC and AngularJS accounting application needed a modern frontend without changing its URLs, backend endpoints, session model, or familiar workflows. Arka used an AI-assisted strangler migration with parity tests as the contract.",
    "teaser": "A legacy insurance receivables application moved from AngularJS 1.4 to Angular 20 in four reversible release batches. It preserved its URL contract, backend endpoints, and user workflows while a shared test harness proved each cutover.",
    "readTime": "9 min read",
    "engagement": "4 release batches",
    "metrics": [
      {
        "value": "11x to 14x",
        "label": "Less hands-on engineering effort"
      },
      {
        "value": "47",
        "label": "End-to-end regression tests"
      },
      {
        "value": "7",
        "label": "Legacy page-apps migrated"
      }
    ],
    "sections": [
      {
        "heading": "The mandate",
        "paragraphs": [
          "Receivables managed outstanding policy-premium balances for two insurance companies from one codebase. The 2014-era Spring MVC and AngularJS application had seven AngularJS page-apps, two Oracle databases, Jasper reporting, drag-and-drop payment workboxes, and container-managed SPNEGO authentication.",
          "The brief was deliberately narrow: replace the frontend with Angular 20 without changing the URL contract, backend endpoints, or the workflows users already knew. The company prefix in every URL selected the Oracle datasource per request, so preserving it was operationally critical."
        ]
      },
      {
        "heading": "Plan before porting",
        "paragraphs": [
          "Before code changed, Claude produced an inventory of endpoints, server-rendered ng-init values, toast messages, and existing feature behaviour. It also surfaced dead or broken features already in production, turning every port-versus-fix choice into an explicit recorded decision.",
          "That inventory made the migration estimable and gave the team a concrete parity checklist for every module."
        ],
        "list": [
          "Every endpoint and server-provided value catalogued before implementation",
          "Dead, broken, and optional behaviour separated from required parity",
          "Estimates and exceptions recorded in reviewable migration decisions"
        ]
      },
      {
        "heading": "A reversible migration strategy",
        "paragraphs": [
          "The team used a strangler-fig approach: one WAR, one deployment, one session, with legacy JSP pages and Angular pages coexisting until each module was ready. Every migrated module received its own extension-less Spring route; the legacy handler could be restored with a single method change if a rollback was needed.",
          "The Angular router base and the bundle asset base were designed separately. That preserved real, company-prefixed URLs while allowing hashed assets to resolve from every page. There was no catch-all route, avoiding accidental capture of legacy pages."
        ],
        "list": [
          "One independent cutover and rollback path per module",
          "Legacy .json and .do request shapes preserved",
          "Company-prefixed URLs kept intact for datasource selection",
          "Legacy files retained through the production soak period"
        ]
      },
      {
        "heading": "Tests were the contract",
        "paragraphs": [
          "Before porting a page, the team wrote a behaviour-level Playwright suite against the legacy implementation and made it pass there first. The exact same assertions then had to pass against the Angular port, proving parity instead of assuming it.",
          "Selectors deliberately accepted both worlds: AngularJS ng-model attributes or Angular name attributes, with legacy modal IDs and drag attributes retained as test-stable seams. The suites used shared development data, so they did not submit, delete, or reserve real records; deep workflows were exercised through read-only paths and skeleton endpoints."
        ],
        "list": [
          "One test suite drives legacy and Angular implementations",
          "Read-only end-to-end tests protect shared development data",
          "Write paths covered through unit tests and scripted manual checks"
        ]
      },
      {
        "heading": "Implementation in reviewable slices",
        "paragraphs": [
          "Each module followed the same golden pattern: inventory, legacy-first suite, typed API service mirroring the Ajax layer, Angular components using signals, route registration, one-method cutover, verification, and documentation. Releases progressed as four stacked batches: foundation and pilot; statements and reports; adjustments, payables, and shell; then transactions last.",
          "Shared models and money-math moved into core rather than being copied between features. Cutovers were checked live with redirect chains, computed styles, and pixel positions where the interface had moved. In total, the work closed with 800 backend tests, 156 frontend specs, and a 47-test end-to-end regression suite across seven pages."
        ]
      },
      {
        "heading": "Migration became an audit",
        "paragraphs": [
          "Porting exposed long-standing defects: a service factory that returned nothing, report endpoints accessible to the wrong company through UI-only gating, an unguarded date parser, and session attributes leaking into redirect URLs. Each was fixed and pinned by a test rather than silently carried into the new application.",
          "One port-created incident became the central lesson. Replacing a legacy full-page reload with an in-place filter refetch dropped the old request-abort behaviour, leaving Oracle threads stuck on Kinsale data. The remedy spanned client and server: request cancellation and disabled controls in the UI, plus a scoped transaction-to-JDBC statement timeout."
        ],
        "list": [
          "Server-side company access enforcement added to report routes",
          "Legacy UX defects improved without changing familiar interaction patterns",
          "Request cancellation and scoped database timeout added after live verification"
        ]
      },
      {
        "heading": "What AI changed and what it did not",
        "paragraphs": [
          "AI accelerated the inventory, implementation, and routine migration work. It did not replace judgment: dead code removal, product decisions, pipeline changes, and risk acceptance remained explicit human approvals.",
          "The original AI-assisted plan budgeted about 22 weeks of engineering effort, versus a conventional estimate of nine to twelve months. Actual hands-on work averaged roughly two working days per release batch. This was an estimated 11x to 14x compression. Calendar delay came from environment constraints, such as a locked Oracle account, not from unverified work being rushed into production."
        ],
        "list": [
          "R1 foundation and pilot: about 4.5 planned weeks, about 2 working days delivered",
          "R2 statements and reports: about 4.5 planned weeks, about 2 working days delivered",
          "R3 adjustments, payables, and shell: about 5.5 planned weeks, about 2 working days delivered",
          "R4 transactions: about 5 to 6 planned weeks, about 2 working days delivered; hardening followed separately"
        ],
        "chart": {
          "title": "Engineering effort per release",
          "description": "Estimated effort is shown against actual hands-on working days. Actual effort excludes calendar delays caused by environment access.",
          "max": 30,
          "rows": [
            { "label": "R1 · Foundation + pilot", "estimated": 22.5, "actual": 2 },
            { "label": "R2 · Statements + reports", "estimated": 22.5, "actual": 2 },
            { "label": "R3 · Adjustments + payables + shell", "estimated": 27.5, "actual": 2 },
            { "label": "R4 · Transactions", "estimated": 27.5, "actual": 2 }
          ]
        }
      },
      {
        "heading": "The takeaway",
        "paragraphs": [
          "This was classical migration discipline at AI speed: characterisation tests as the contract, small reversible slices, recorded decisions, and verification for every claim. The typing became faster; review, user acceptance testing, and operational trust remained the dominant work.",
          "For complex legacy migrations, preserve the behaviour users depend on, keep rollback close, and make the harness, not the generated code, the source of confidence."
        ]
      }
    ]
  },
  "agricultural-export-cooperative": {
    "slug": "agricultural-export-cooperative",
    "accent": "#b7e0e7",
    "label": "Sustainability · Supply chain",
    "title": "Agricultural export cooperative",
    "summary": "Traceability data was scattered across field notes, vendor emails, and legacy ERP exports. Arka unified the pipeline, added validation at each step, and gave operations a live picture of shipment readiness.",
    "teaser": "Traceability data was scattered across field notes, vendor emails, and legacy ERP exports. Arka unified the pipeline, added validation at each step, and gave operations a live picture of shipment readiness without adding headcount.",
    "readTime": "8 min read",
    "engagement": "20-week engagement",
    "metrics": [
      {
        "value": "100%",
        "label": "Shipment readiness visibility"
      },
      {
        "value": "4",
        "label": "Data sources unified"
      },
      {
        "value": "0",
        "label": "Additional headcount required"
      }
    ],
    "sections": [
      {
        "heading": "The challenge",
        "paragraphs": [
          "An agricultural export cooperative needed traceability data to satisfy buyer requirements, but the information lived in field notes, vendor emails, and periodic ERP exports. Operations learned about gaps only when a container was already scheduled.",
          "Compliance pressure was increasing while the team had no appetite to add manual review layers on top of an already stretched operation."
        ]
      },
      {
        "heading": "What we did",
        "paragraphs": [
          "We unified the traceability pipeline without asking growers and vendors to learn a heavy new system. Validation happened at the points where data was already being captured—reducing duplicate entry and late surprises."
        ],
        "list": [
          "Mapped data requirements from field capture through export documentation",
          "Connected legacy ERP exports with vendor and quality checkpoints",
          "Added validation rules at each step with clear exception handling",
          "Built a live shipment readiness view for operations and compliance"
        ]
      },
      {
        "heading": "Results",
        "paragraphs": [
          "Operations gained a live picture of which shipments were documentation-ready without adding headcount. Late discoveries of missing certificates dropped sharply in the first export season after launch.",
          "Compliance reviews shifted from reconstructing history to confirming exceptions— a much smaller, more manageable workload."
        ]
      },
      {
        "heading": "Designed for the field",
        "paragraphs": [
          "The system respected how people already worked in the field and at the dock. Lightweight capture and clear status feedback mattered as much as the backend integration."
        ]
      }
    ]
  },
  "appointment-intake-operations": {
    "slug": "appointment-intake-operations",
    "accent": "#ffd0bd",
    "label": "Healthcare · Clinic network",
    "title": "Shared appointment and intake platform",
    "summary": "Three clinics needed one place to manage provider calendars, digital intake, SMS reminders, no-show follow-up, and waitlist calls. Arka built the shared web app that ran the work.",
    "teaser": "A shared appointment and intake platform gave three clinic front desks one source of truth for provider calendars, reminders, open slots, no-shows, and the next patient to call from the waitlist.",
    "readTime": "6 min read",
    "engagement": "10-week engagement",
    "metrics": [
      {
        "value": "22%",
        "label": "Better same-day capacity use"
      },
      {
        "value": "3",
        "label": "Clinic locations connected"
      },
      {
        "value": "35%",
        "label": "Less no-show follow-up effort"
      }
    ],
    "sections": [
      {
        "heading": "The challenge",
        "paragraphs": [
          "Three clinic locations managed appointments through disconnected front-desk routines. Staff had to reconcile provider availability, paper intake forms, reminder calls, cancellations, and follow-up work while patients were arriving.",
          "There was no shared operational view. A cancellation at one location did not immediately become a clear task, and staff had no consistent way to see the next suitable patient on the waitlist or who owned the call."
        ]
      },
      {
        "heading": "One shared operational view",
        "paragraphs": [
          "We built a custom web app used by every clinic front desk. It became the shared source of truth for appointments: staff selected a clinic location, moved between provider calendars, and created, updated, or cancelled appointments in the same place.",
          "Each appointment carried the operational context the desk needed to act: provider, location, appointment time, intake completion, reminder state, appointment status, follow-up owner, and waitlist eligibility."
        ],
        "list": [
          "Location and provider calendar views in one web application",
          "A structured digital intake flow with completion status visible before arrival",
          "Configurable SMS appointment reminders sent through Twilio",
          "A cross-location Today view for open slots, incomplete intake, and follow-up work"
        ]
      },
      {
        "heading": "No-shows became owned work",
        "paragraphs": [
          "After an appointment time passed, the responsible desk could record the outcome directly: checked in, cancelled, rescheduled, no-show, or needs follow-up. A no-show created a clear call task instead of disappearing into a paper list or a verbal handoff.",
          "Staff recorded whether the patient had been reached, rescheduled, left a voicemail, or remained unresolved. That made follow-up visible to the next shift and to managers without asking teams to reconstruct the day."
        ]
      },
      {
        "heading": "Turning cancellations into capacity",
        "paragraphs": [
          "When a slot opened, the app surfaced the next appropriate waiting-list patient based on location, provider, and availability. It gave the front desk a call task and the context to act; staff still spoke to the patient and booked the appointment themselves.",
          "This kept the workflow human where it mattered while making the next best action obvious. The platform did not auto-book patients or rely on delayed schedule imports."
        ],
        "flow": "appointment-operations"
      },
      {
        "heading": "Results",
        "paragraphs": [
          "Same-day capacity use improved by 22% across the three clinic locations. No-show follow-up effort fell by 35% because reminders, appointment outcomes, and call tasks were all handled in one place.",
          "Patients received more consistent reminders and spent less time repeating intake information at the desk. For staff, the gain was a calmer front desk: fewer disconnected tools and a shared view of the work that needed attention."
        ]
      }
    ]
  },
  "insurance-submission-intake": {
    "slug": "insurance-submission-intake",
    "accent": "#a7bbc0",
    "label": "Insurance · Underwriting operations",
    "title": "Submission intake and routing workspace",
    "summary": "Insurance submissions arrive through web forms, email, fax, and messaging channels with incomplete, inconsistent, and duplicated information. Arka maps a single workflow that turns each request into a source-grounded, reviewable underwriting work item.",
    "teaser": "A narrow AI-assisted intake workflow gives underwriters one complete submission record, a clear missing-information checklist, and links back to the original evidence before they begin quote work.",
    "readTime": "5 min read",
    "engagement": "Discovery workflow",
    "metrics": [
      {
        "value": "4",
        "label": "Input funnels mapped"
      },
      {
        "value": "1",
        "label": "Normalized underwriting work item"
      },
      {
        "value": "0",
        "label": "Autonomous underwriting decisions"
      }
    ],
    "sections": [
      {
        "heading": "The operating problem",
        "paragraphs": [
          "A submission may arrive as a web form, an email thread with several attachments, a faxed application, or a message from a broker. Operations staff have to identify the right documents, rekey core facts, check for duplicates, chase missing information, and hand the file to an underwriter.",
          "The underwriter often begins with an incomplete picture and has to reconstruct the submission before evaluating risk, preparing a quote, or binding a policy."
        ]
      },
      {
        "heading": "The smallest useful workflow",
        "paragraphs": [
          "Start with one line of business and one high-volume channel, such as broker email with PDF attachments. The workflow creates a single submission record, extracts the key facts, checks completeness, and places the work into a clear queue.",
          "The first release does not need to replace the policy administration or rating system. It prepares a clean, traceable work item for the systems and people already responsible for quote and bind."
        ],
        "list": [
          "Receive the message and all attached documents",
          "Create or match one submission record",
          "Extract proposed facts and document types",
          "Check required fields and documents with deterministic rules",
          "Place the submission in ready, needs information, referral, or possible duplicate"
        ]
      },
      {
        "heading": "Where AI earns its place",
        "paragraphs": [
          "The AI building block is source-grounded extraction. It reads unstructured email, scans, ACORD forms, loss runs, and broker narratives, then proposes structured fields such as insured name, broker, effective date, risk location, coverage request, limits, and document type.",
          "Each proposed field carries a confidence level and a link to the source document, page, and supporting text. If the evidence is unclear, the system records unknown rather than inventing an answer."
        ],
        "list": [
          "Document classification across mixed submission packs",
          "Field extraction with page-level source evidence",
          "Identification of missing or contradictory information",
          "A concise submission brief for the underwriter"
        ],
        "flow": "insurance-submission"
      },
      {
        "heading": "Rules and people keep authority",
        "paragraphs": [
          "Rules, not the language model, check required documents, required fields, duplicate submissions, queue ownership, and service-level deadlines. The rules decide whether a record is ready for review or needs more information.",
          "The underwriter decides whether the risk fits appetite, whether to refer or decline, what terms to offer, and whether to bind. The system assists the handoff. It does not make an underwriting decision or send consequential broker communication without review."
        ]
      },
      {
        "heading": "What changes for the underwriting desk",
        "paragraphs": [
          "Instead of opening multiple files and searching an inbox, the underwriter receives one work item with the source pack, extracted facts, outstanding questions, status, owner, and handoff history. That creates a consistent starting point for quote work without disrupting the existing policy workflow.",
          "Once the intake data is trusted, the same structured record can support later capabilities such as routing recommendations, broker follow-up drafts, and underwriting decision support. Those are later stages, not dependencies for the first useful release.",
          "The planning scenarios below are not measured client results. They show the potential operational capacity released when the review process becomes shorter and more consistent."
        ],
        "scenarioTable": {
          "caption": "Potential review-time savings per 1,000 submissions",
          "headers": ["Scenario", "Average review time", "Time saved per submission", "Hours saved per 1,000 submissions"],
          "rows": [
            ["Conservative", "3 minutes", "2 minutes, 40%", "33 hours"],
            ["Pilot target", "2 minutes", "3 minutes, 60%", "50 hours"],
            ["Strong result", "1 minute", "4 minutes, 80%", "67 hours"]
          ]
        }
      }
    ]
  }
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}

export function getPublishedCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDY_ORDER.includes(slug) ? CASE_STUDIES[slug] : undefined;
}

export function orderedCaseStudies(): CaseStudy[] {
  return CASE_STUDY_ORDER.map((slug) => CASE_STUDIES[slug]).filter(Boolean);
}
