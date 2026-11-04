import type { PlatformState, QuoteLine, WorkCenterCapacity } from "./types";
import { calculateQuote } from "./pricing";

export const capacities: WorkCenterCapacity[] = [
  { workCenter: "Cutting", availableHours: 160, bookedHours: 102, hourlyRate: 950 },
  { workCenter: "Machining", availableHours: 240, bookedHours: 194, hourlyRate: 1650 },
  { workCenter: "Fabrication", availableHours: 200, bookedHours: 126, hourlyRate: 1200 },
  { workCenter: "Finishing", availableHours: 140, bookedHours: 119, hourlyRate: 780 },
  { workCenter: "Assembly", availableHours: 180, bookedHours: 98, hourlyRate: 850 },
];

const seedLine: QuoteLine = { id: "line-seed", description: "CNC machined pump housing", drawingRef: "HF-PH-214-R3", material: "Aluminium 6061-T6", quantity: 120, materialCost: 146000, processes: [{ workCenter: "Cutting", hours: 10 }, { workCenter: "Machining", hours: 32 }, { workCenter: "Finishing", hours: 8 }], toolingCost: 24000, packagingCost: 7500, marginPct: 20, gstPct: 18 };
const seedPricing = calculateQuote([seedLine], capacities);

export const seedState: PlatformState = {
  capacities,
  inquiries: [
    { id: "INQ-2408", source: "WhatsApp", status: "New", company: "Suryodaya Pumps", contactName: "Ananya Rao", email: "ananya@suryodayapumps.in", phone: "+91 98450 21864", receivedAt: "2026-11-04T08:40:00+05:30", requestedDate: "2026-12-05", drawingRef: "SP-IM-448-B", material: "SS 316L", quantity: 80, tolerance: "±0.03 mm", processes: [{ workCenter: "Machining", hours: 38 }, { workCenter: "Finishing", hours: 12 }], attachments: ["impeller-rev-b.pdf", "inspection-note.jpg"], notes: "Urgent replacement batch for export pumps. Material certificates required." },
    { id: "INQ-2407", source: "Email", status: "Qualified", company: "Kaveri Motion Systems", contactName: "Rahul Iyer", email: "rahul.iyer@kaverimotion.in", receivedAt: "2026-11-03T15:20:00+05:30", requestedDate: "2026-11-28", drawingRef: "KMS-BR-091-R2", material: "EN8 steel", quantity: 240, tolerance: "±0.05 mm", processes: [{ workCenter: "Cutting", hours: 14 }, { workCenter: "Machining", hours: 44 }, { workCenter: "Finishing", hours: 10 }], attachments: ["bearing-retainer-step.zip"], notes: "Customer has approved the prototype. This is the first production batch." },
    { id: "INQ-2406", source: "Web", status: "Quoted", company: "Horizon Fluidics", contactName: "Meera Shah", email: "meera@horizonfluidics.com", receivedAt: "2026-11-02T10:05:00+05:30", requestedDate: "2026-12-12", drawingRef: "HF-PH-214-R3", material: "Aluminium 6061-T6", quantity: 120, tolerance: "±0.02 mm", processes: seedLine.processes, attachments: ["pump-housing-r3.step", "rfq-214.pdf"], notes: "Anodising in natural finish. Quote freight separately." },
    { id: "INQ-2405", source: "Email", status: "Won", company: "Pragati Automation", contactName: "Vikram Kulkarni", email: "vikram@pragatiautomation.in", receivedAt: "2026-10-29T11:30:00+05:30", requestedDate: "2026-11-25", drawingRef: "PA-FRM-730", material: "CRCA steel", quantity: 40, tolerance: "General ISO 2768-m", processes: [{ workCenter: "Cutting", hours: 18 }, { workCenter: "Fabrication", hours: 42 }, { workCenter: "Finishing", hours: 16 }, { workCenter: "Assembly", hours: 12 }], attachments: ["machine-frame-dwg.pdf"], notes: "Powder coat RAL 7035. Includes purchased levelling feet." },
    { id: "INQ-2404", source: "WhatsApp", status: "Lost", company: "Neelkanth Process", contactName: "Karan Joshi", email: "karan@neelkanthprocess.in", receivedAt: "2026-10-27T09:15:00+05:30", requestedDate: "2026-11-18", drawingRef: "NP-SK-018", material: "Mild steel", quantity: 12, tolerance: "±0.5 mm", processes: [{ workCenter: "Fabrication", hours: 26 }, { workCenter: "Finishing", hours: 7 }], attachments: ["skid-frame.png"], notes: "Budget did not align with required inspection scope." },
  ],
  quotes: [{ id: "QT-1098", inquiryId: "INQ-2406", customer: "Horizon Fluidics", contactName: "Meera Shah", recipient: "meera@horizonfluidics.com", status: "Sent", createdAt: "2026-11-03T12:10:00+05:30", validUntil: "2026-11-18", paymentTerms: "50% advance, balance before dispatch", notes: "Freight at actuals. Material certificate included.", lines: [seedLine], capacitySnapshot: seedPricing.projection, subtotal: seedPricing.subtotal, gst: seedPricing.gst, total: seedPricing.total, sentAt: "2026-11-03T13:00:00+05:30" }],
  orders: [
    { id: "ORD-0102", quoteId: "QT-1092", customer: "Pragati Automation", status: "In Production", createdAt: "2026-10-30T10:00:00+05:30", promisedDate: "2026-11-25", amount: 684400, capacitySnapshot: [] },
    { id: "ORD-0101", quoteId: "QT-1084", customer: "Arvind Thermal", status: "Ready", createdAt: "2026-10-21T10:00:00+05:30", promisedDate: "2026-11-07", amount: 428650, capacitySnapshot: [] },
  ],
  revenue: [
    { id: "REV-1", orderId: "ORD-0098", month: "Jun", booked: 720000, collected: 610000, margin: 0.24 },
    { id: "REV-2", orderId: "ORD-0099", month: "Jul", booked: 890000, collected: 780000, margin: 0.22 },
    { id: "REV-3", orderId: "ORD-0100", month: "Aug", booked: 1180000, collected: 940000, margin: 0.25 },
    { id: "REV-4", orderId: "ORD-0101", month: "Sep", booked: 960000, collected: 910000, margin: 0.23 },
    { id: "REV-5", orderId: "ORD-0102", month: "Oct", booked: 1320000, collected: 1010000, margin: 0.26 },
    { id: "REV-6", orderId: "current", month: "Nov", booked: 1113050, collected: 520000, margin: 0.24 },
  ],
  emailEvents: [],
  activity: [
    { id: "ACT-1", type: "inquiry", title: "INQ-2408 received", detail: "Suryodaya Pumps • WhatsApp", createdAt: "2026-11-04T08:40:00+05:30" },
    { id: "ACT-2", type: "quote", title: "QT-1098 sent", detail: "Horizon Fluidics • ₹3.18 lakh", createdAt: "2026-11-03T13:00:00+05:30" },
    { id: "ACT-3", type: "order", title: "ORD-0102 moved to production", detail: "Pragati Automation", createdAt: "2026-11-02T16:20:00+05:30" },
  ],
};
