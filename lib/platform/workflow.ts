import type { ActivityEvent, EmailEvent, Inquiry, Order, PlatformState, Quote } from "./types";

const now = () => new Date().toISOString();
const eventId = (prefix: string) => `${prefix}-${Date.now()}`;

export function addQuote(state: PlatformState, quote: Quote): PlatformState {
  return {
    ...state,
    quotes: [quote, ...state.quotes],
    inquiries: state.inquiries.map((item) => item.id === quote.inquiryId ? { ...item, status: "Quoted" } : item),
    activity: [{ id: eventId("activity"), type: "quote", title: `${quote.id} created`, detail: quote.customer, createdAt: now() }, ...state.activity],
  };
}

export function sendQuote(state: PlatformState, quoteId: string, recipient: string, subject: string, message: string): PlatformState {
  const sentAt = now();
  const email: EmailEvent = { id: eventId("email"), quoteId, recipient, subject, message, sentAt };
  const quote = state.quotes.find((item) => item.id === quoteId);
  const activity: ActivityEvent = { id: eventId("activity"), type: "email", title: `${quoteId} sent`, detail: `${quote?.customer || "Customer"} • ${recipient}`, createdAt: sentAt };
  return { ...state, emailEvents: [email, ...state.emailEvents], quotes: state.quotes.map((item) => item.id === quoteId ? { ...item, status: "Sent", sentAt } : item), activity: [activity, ...state.activity] };
}

export function acceptQuote(state: PlatformState, quoteId: string): PlatformState {
  const acceptedAt = now();
  const quote = state.quotes.find((item) => item.id === quoteId);
  return {
    ...state,
    quotes: state.quotes.map((item) => item.id === quoteId ? { ...item, status: "Accepted", acceptedAt } : item),
    inquiries: state.inquiries.map((item) => item.id === quote?.inquiryId ? { ...item, status: "Won" } : item),
    activity: [{ id: eventId("activity"), type: "quote", title: `${quoteId} accepted`, detail: quote?.customer || "Customer", createdAt: acceptedAt }, ...state.activity],
  };
}

export function convertQuoteToOrder(state: PlatformState, quoteId: string): PlatformState {
  if (state.orders.some((order) => order.quoteId === quoteId)) return state;
  const quote = state.quotes.find((item) => item.id === quoteId && item.status === "Accepted");
  if (!quote) return state;
  const createdAt = now();
  const promisedDate = new Date(Date.now() + 21 * 86400000).toISOString().slice(0, 10);
  const order: Order = { id: `ORD-${String(state.orders.length + 101).padStart(4, "0")}`, quoteId, customer: quote.customer, status: "Confirmed", createdAt, promisedDate, amount: quote.total, capacitySnapshot: quote.capacitySnapshot };
  return { ...state, orders: [order, ...state.orders], activity: [{ id: eventId("activity"), type: "order", title: `${order.id} confirmed`, detail: `${quote.customer} • from ${quoteId}`, createdAt }, ...state.activity] };
}

export function updateInquiryStatus(inquiries: Inquiry[], id: string, status: Inquiry["status"]) {
  return inquiries.map((item) => item.id === id ? { ...item, status } : item);
}
