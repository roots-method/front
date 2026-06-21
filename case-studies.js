window.CASE_STUDY_ORDER = [
  "regional-logistics-network",
  "multi-office-advisory-firm",
  "direct-to-consumer-retailer",
  "onboarding-success-platform",
  "agricultural-export-cooperative",
  "appointment-intake-operations",
];

window.CASE_STUDIES = {
  "regional-logistics-network": {
    slug: "regional-logistics-network",
    accent: "#7fd1ae",
    label: "Operations · Distribution",
    title: "Regional logistics network",
    summary:
      "Dispatch and invoicing lived in three disconnected tools. We mapped the handoffs, automated status updates, and built a single intake view for the ops team.",
    teaser:
      "Dispatch and invoicing lived in three disconnected tools. We mapped the handoffs, automated status updates, and built a single intake view for the ops team. Cycle time dropped from 18 days to 6, and error-related rework fell by roughly a third.",
    readTime: "6 min read",
    engagement: "14-week engagement",
    metrics: [
      { value: "67%", label: "Faster workflow cycle" },
      { value: "33%", label: "Less error-related rework" },
      { value: "1", label: "Unified ops intake view" },
    ],
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "A regional distributor was moving freight across twelve depots with dispatch notes in one system, billing in another, and customer updates buried in email threads. Ops managers spent the first hour of each day reconciling what had actually shipped versus what finance could invoice.",
          "Handoffs between dispatch, warehouse, and accounts receivable had no shared status model. When a delivery exception occurred, teams discovered it days later—often after a customer had already called.",
        ],
      },
      {
        heading: "What we did",
        paragraphs: [
          "We mapped the full shipment lifecycle from order release through proof of delivery, identifying seven manual checkpoints that could be standardized or automated without removing human judgment on exceptions.",
        ],
        list: [
          "Documented handoffs and decision points across dispatch, warehouse, and finance",
          "Introduced a shared status model with automated updates at each milestone",
          "Built a single intake dashboard for the ops team with exception routing rules",
          "Connected invoicing triggers to verified delivery events instead of manual sign-off",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Cycle time dropped from 18 days to 6 on average. Error-related rework fell by roughly a third because teams were working from the same source of truth instead of reconciling parallel records.",
          "The ops lead described the change as shifting effort from chasing updates to resolving exceptions—the work that actually required experience and context.",
        ],
      },
      {
        heading: "What stayed human",
        paragraphs: [
          "High-variance routes, damaged goods, and credit holds still route to experienced coordinators. Automation handles the predictable path so people can focus where judgment matters.",
        ],
      },
    ],
  },
  "multi-office-advisory-firm": {
    slug: "multi-office-advisory-firm",
    accent: "#c4bda5",
    label: "Finance · Professional services",
    title: "Multi-office advisory firm",
    summary:
      "Month-end reporting consumed two full weeks across four locations. dhee systems standardized data capture, introduced approval checkpoints, and layered in light automation for recurring reconciliations.",
    teaser:
      "Month-end reporting consumed two full weeks across four locations. dhee systems standardized data capture, introduced approval checkpoints, and layered in light automation for recurring reconciliations freeing analysts to focus on review instead of assembly.",
    readTime: "7 min read",
    engagement: "18-week engagement",
    metrics: [
      { value: "9 days", label: "Saved on month-end close" },
      { value: "4", label: "Offices on one reporting rhythm" },
      { value: "62%", label: "Less manual assembly time" },
    ],
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "A multi-office advisory firm closed books across four locations with slightly different spreadsheet templates, local naming conventions, and approval habits. Month-end reporting took two full weeks—mostly assembly, not analysis.",
          "Partners wanted consistent visibility into utilization and margin by practice area, but each office exported data differently. Analysts became translators between systems instead of reviewers of performance.",
        ],
      },
      {
        heading: "What we did",
        paragraphs: [
          "We treated reporting as a workflow problem first. Before adding automation, we aligned how each office captured time, expenses, and work-in-progress so downstream steps could trust the inputs.",
        ],
        list: [
          "Standardized data capture templates and field definitions across offices",
          "Designed approval checkpoints with clear ownership before consolidation",
          "Automated recurring reconciliations and variance flagging for analysts",
          "Built a leadership dashboard tied to the same definitions used in close",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Month-end assembly time dropped by more than half. Analysts reclaimed nearly two days per close cycle for review and commentary instead of copy-paste reconciliation.",
          "Leadership now receives a consistent weekly snapshot using the same metrics that feed the formal close—reducing surprises when numbers shift at month end.",
        ],
      },
      {
        heading: "How it compounds",
        paragraphs: [
          "With a stable reporting backbone in place, the firm is extending the same workflow patterns to client profitability views and partner compensation modeling without rebuilding from scratch each quarter.",
        ],
      },
    ],
  },
  "direct-to-consumer-retailer": {
    slug: "direct-to-consumer-retailer",
    accent: "#9dc5be",
    label: "Growth · Consumer brand",
    title: "Direct-to-consumer retailer",
    summary:
      "Inventory, fulfillment, and customer support ran on parallel spreadsheets. We designed a connected workflow with clearer ownership, automated low-risk decisions, and a dashboard the leadership team could trust.",
    teaser:
      "Inventory, fulfillment, and customer support ran on parallel spreadsheets. We designed a connected workflow with clearer ownership, automated low-risk decisions, and a dashboard the leadership team could trust for weekly planning.",
    readTime: "6 min read",
    engagement: "12-week engagement",
    metrics: [
      { value: "40%", label: "Fewer stockout escalations" },
      { value: "3", label: "Teams on one planning view" },
      { value: "2×", label: "Faster weekly planning cadence" },
    ],
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "A growing DTC brand had outgrown its spreadsheet stack. Inventory planners, fulfillment coordinators, and support leads each maintained their own version of truth. Weekly planning meetings started with reconciliation, not decisions.",
          "Promotional spikes exposed the gaps quickly: support could not see inbound restocks, and fulfillment commitments were made without reliable inventory signals.",
        ],
      },
      {
        heading: "What we did",
        paragraphs: [
          "We connected the workflows that drive customer promise—available inventory, fulfillment capacity, and support backlog—into a single operating rhythm with explicit owners at each step.",
        ],
        list: [
          "Mapped decision rights for replenishment, allocation, and exception handling",
          "Automated low-risk reorder and routing rules with human override paths",
          "Linked support ticket trends to inventory and fulfillment signals",
          "Delivered a leadership dashboard refreshed on a cadence the team could trust",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Stockout escalations dropped materially during the next two promotional cycles. Weekly planning moved from a half-day reconciliation exercise to a focused ninety-minute review.",
          "Support, fulfillment, and merchandising now reference the same numbers when discussing customer impact—reducing cross-functional friction during peak periods.",
        ],
      },
      {
        heading: "What changed culturally",
        paragraphs: [
          "The biggest shift was clarity of ownership. When a metric moved, teams knew which workflow to inspect instead of debating whose spreadsheet was correct.",
        ],
      },
    ],
  },
  "onboarding-success-platform": {
    slug: "onboarding-success-platform",
    accent: "#ff8962",
    label: "Technology · B2B SaaS",
    title: "Onboarding and success platform",
    summary:
      "New customer setup required manual coordination across sales, product, and support. We built an agent assisted intake flow with structured prompts, routing rules, and milestone tracking.",
    teaser:
      "New customer setup required manual coordination across sales, product, and support. We built an agent assisted intake flow with structured prompts, routing rules, and milestone tracking—cutting average onboarding time by nearly half.",
    readTime: "7 min read",
    engagement: "16-week engagement",
    metrics: [
      { value: "48%", label: "Faster average onboarding" },
      { value: "0", label: "Missed handoffs after go-live" },
      { value: "3", label: "Teams on shared milestones" },
    ],
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "A B2B SaaS company sold complex implementations but onboarded customers through ad hoc email threads and shared docs. Sales, product, and customer success each tracked progress differently, and customers felt the friction in long time-to-value.",
          "Implementation managers spent more time chasing internal updates than guiding customers through configuration and adoption.",
        ],
      },
      {
        heading: "What we did",
        paragraphs: [
          "We designed an intake and onboarding system that structured the work without removing the consultative parts of implementation. Agent-assisted prompts helped gather requirements consistently while routing rules kept internal teams aligned.",
        ],
        list: [
          "Built a structured intake flow with guided prompts and validation",
          "Defined milestone templates by customer segment and contract type",
          "Automated internal routing and status notifications at each gate",
          "Gave customer success a live view of blockers, owners, and target dates",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Average onboarding time dropped by nearly half. Missed handoffs between sales and success effectively disappeared because every transition had a defined owner and completion criteria.",
          "Customers reported clearer expectations during implementation—fewer surprises about what was needed from their team and when.",
        ],
      },
      {
        heading: "Where agents helped",
        paragraphs: [
          "Agents handled repeatable discovery questions and document checks, escalating edge cases to implementation managers. That kept human time focused on configuration decisions and change management, not form chasing.",
        ],
      },
    ],
  },
  "agricultural-export-cooperative": {
    slug: "agricultural-export-cooperative",
    accent: "#b7e0e7",
    label: "Sustainability · Supply chain",
    title: "Agricultural export cooperative",
    summary:
      "Traceability data was scattered across field notes, vendor emails, and legacy ERP exports. dhee systems unified the pipeline, added validation at each step, and gave operations a live picture of shipment readiness.",
    teaser:
      "Traceability data was scattered across field notes, vendor emails, and legacy ERP exports. dhee systems unified the pipeline, added validation at each step, and gave operations a live picture of shipment readiness without adding headcount.",
    readTime: "8 min read",
    engagement: "20-week engagement",
    metrics: [
      { value: "100%", label: "Shipment readiness visibility" },
      { value: "4", label: "Data sources unified" },
      { value: "0", label: "Additional headcount required" },
    ],
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "An agricultural export cooperative needed traceability data to satisfy buyer requirements, but the information lived in field notes, vendor emails, and periodic ERP exports. Operations learned about gaps only when a container was already scheduled.",
          "Compliance pressure was increasing while the team had no appetite to add manual review layers on top of an already stretched operation.",
        ],
      },
      {
        heading: "What we did",
        paragraphs: [
          "We unified the traceability pipeline without asking growers and vendors to learn a heavy new system. Validation happened at the points where data was already being captured—reducing duplicate entry and late surprises.",
        ],
        list: [
          "Mapped data requirements from field capture through export documentation",
          "Connected legacy ERP exports with vendor and quality checkpoints",
          "Added validation rules at each step with clear exception handling",
          "Built a live shipment readiness view for operations and compliance",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Operations gained a live picture of which shipments were documentation-ready without adding headcount. Late discoveries of missing certificates dropped sharply in the first export season after launch.",
          "Compliance reviews shifted from reconstructing history to confirming exceptions— a much smaller, more manageable workload.",
        ],
      },
      {
        heading: "Designed for the field",
        paragraphs: [
          "The system respected how people already worked in the field and at the dock. Lightweight capture and clear status feedback mattered as much as the backend integration.",
        ],
      },
    ],
  },
  "appointment-intake-operations": {
    slug: "appointment-intake-operations",
    accent: "#ffd0bd",
    label: "Healthcare · Clinic network",
    title: "Appointment and intake operations",
    summary:
      "Front-desk staff toggled between scheduling tools and paper forms. We digitized intake, connected reminders to the calendar system, and reduced no-show follow-up effort.",
    teaser:
      "Front-desk staff toggled between scheduling tools and paper forms. We digitized intake, connected reminders to the calendar system, and reduced no-show follow-up effort—improving same-day capacity use across three clinic locations.",
    readTime: "6 min read",
    engagement: "10-week engagement",
    metrics: [
      { value: "22%", label: "Better same-day capacity use" },
      { value: "3", label: "Clinic locations connected" },
      { value: "35%", label: "Less no-show follow-up effort" },
    ],
    sections: [
      {
        heading: "The challenge",
        paragraphs: [
          "A three-location clinic network relied on a scheduling tool, paper intake forms, and manual reminder calls. Front-desk staff context-switched constantly, and no-show follow-up consumed hours that could have gone to patient-facing work.",
          "Administrators lacked a reliable view of same-day capacity across locations, making it hard to absorb cancellations efficiently.",
        ],
      },
      {
        heading: "What we did",
        paragraphs: [
          "We digitized intake and connected it to the existing calendar system so front-desk workflows stayed familiar while removing duplicate data entry and manual reminder tracking.",
        ],
        list: [
          "Replaced paper intake with a structured digital flow at check-in",
          "Connected appointment reminders to the calendar with configurable timing",
          "Automated no-show follow-up tasks with clear staff ownership",
          "Gave administrators a cross-location view of same-day openings",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Same-day capacity use improved across all three locations. No-show follow-up effort dropped by more than a third because reminders and tasks were triggered automatically instead of tracked on clipboards.",
          "Front-desk staff reported fewer interruptions from chasing incomplete intake information during peak morning hours.",
        ],
      },
      {
        heading: "Patient experience",
        paragraphs: [
          "Patients spent less time repeating information at the desk, and reminder timing became more consistent. The operational gains showed up internally first, but the waiting-room experience improved as a direct result.",
        ],
      },
    ],
  },
};
