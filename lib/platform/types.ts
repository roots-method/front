export type InquirySource = "Email" | "Web" | "WhatsApp";
export type InquiryStatus = "New" | "Qualified" | "Quoted" | "Won" | "Lost";
export type QuoteStatus = "Draft" | "Sent" | "Accepted" | "Rejected" | "Expired";
export type OrderStatus = "Confirmed" | "In Production" | "Ready" | "Dispatched";
export type WorkCenterName = "Cutting" | "Machining" | "Fabrication" | "Finishing" | "Assembly";

export interface ProcessRequirement { workCenter: WorkCenterName; hours: number }
export interface Inquiry {
  id: string; source: InquirySource; status: InquiryStatus; company: string; contactName: string;
  email: string; phone?: string; receivedAt: string; requestedDate: string; drawingRef: string;
  material: string; quantity: number; tolerance: string; processes: ProcessRequirement[];
  attachments: string[]; notes: string;
}
export interface WorkCenterCapacity {
  workCenter: WorkCenterName; availableHours: number; bookedHours: number; hourlyRate: number;
}
export interface QuoteLine {
  id: string; description: string; drawingRef: string; material: string; quantity: number;
  materialCost: number; processes: ProcessRequirement[]; toolingCost: number; packagingCost: number;
  marginPct: number; gstPct: number; coordinatorOverride?: number;
}
export interface CapacityProjection { workCenter: WorkCenterName; requiredHours: number; utilization: number }
export interface Quote {
  id: string; inquiryId: string; customer: string; contactName: string; recipient: string;
  status: QuoteStatus; createdAt: string; validUntil: string; paymentTerms: string; notes: string;
  lines: QuoteLine[]; capacitySnapshot: CapacityProjection[]; subtotal: number; gst: number; total: number;
  sentAt?: string; acceptedAt?: string;
}
export interface Order {
  id: string; quoteId: string; customer: string; status: OrderStatus; createdAt: string;
  promisedDate: string; amount: number; capacitySnapshot: CapacityProjection[];
}
export interface RevenueEntry { id: string; orderId: string; month: string; booked: number; collected: number; margin: number }
export interface EmailEvent { id: string; quoteId: string; recipient: string; subject: string; message: string; sentAt: string }
export interface ActivityEvent { id: string; type: string; title: string; detail: string; createdAt: string }
export interface PlatformState {
  inquiries: Inquiry[]; quotes: Quote[]; orders: Order[]; revenue: RevenueEntry[];
  emailEvents: EmailEvent[]; activity: ActivityEvent[]; capacities: WorkCenterCapacity[];
}
