import { describe, expect, it } from "vitest";
import { seedState } from "./seed";
import { acceptQuote, addQuote, convertQuoteToOrder, sendQuote } from "./workflow";
import type { Quote } from "./types";

const quote: Quote = { id: "QT-TEST", inquiryId: "INQ-2407", customer: "Kaveri Motion Systems", contactName: "Rahul Iyer", recipient: "rahul@example.com", status: "Draft", createdAt: new Date().toISOString(), validUntil: "2026-12-01", paymentTerms: "Advance", notes: "", lines: [], capacitySnapshot: [], subtotal: 100, gst: 18, total: 118 };

describe("inquiry to order transitions", () => {
  it("creates a quote and marks the inquiry quoted", () => {
    const state = addQuote(seedState, quote);
    expect(state.quotes[0].id).toBe("QT-TEST");
    expect(state.inquiries.find((item) => item.id === quote.inquiryId)?.status).toBe("Quoted");
  });
  it("records simulated sends", () => {
    const state = sendQuote(addQuote(seedState, quote), quote.id, quote.recipient, "Subject", "A sufficiently long message");
    expect(state.quotes.find((item) => item.id === quote.id)?.status).toBe("Sent");
    expect(state.emailEvents[0].recipient).toBe(quote.recipient);
  });
  it("accepts a quote and converts it once", () => {
    const accepted = acceptQuote(addQuote(seedState, quote), quote.id);
    const converted = convertQuoteToOrder(accepted, quote.id);
    expect(converted.orders.filter((order) => order.quoteId === quote.id)).toHaveLength(1);
    expect(convertQuoteToOrder(converted, quote.id).orders.filter((order) => order.quoteId === quote.id)).toHaveLength(1);
  });
});
