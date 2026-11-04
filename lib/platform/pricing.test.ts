import { describe, expect, it } from "vitest";
import { calculateLine, premiumForUtilization, projectCapacity } from "./pricing";
import type { QuoteLine, WorkCenterCapacity } from "./types";

const capacity: WorkCenterCapacity[] = [
  { workCenter: "Cutting", availableHours: 100, bookedHours: 60, hourlyRate: 1000 },
  { workCenter: "Machining", availableHours: 100, bookedHours: 80, hourlyRate: 1500 },
];
const line: QuoteLine = { id: "1", description: "Part", drawingRef: "D1", material: "EN8", quantity: 10, materialCost: 10000, processes: [{ workCenter: "Cutting", hours: 5 }, { workCenter: "Machining", hours: 5 }], toolingCost: 2000, packagingCost: 1000, marginPct: 20, gstPct: 18 };

describe("capacity-aware pricing", () => {
  it("covers all four capacity premium tiers", () => {
    expect(premiumForUtilization(.69)).toBe(0);
    expect(premiumForUtilization(.70)).toBe(.05);
    expect(premiumForUtilization(.85)).toBe(.1);
    expect(premiumForUtilization(.95)).toBe(.18);
  });
  it("selects the most constrained required work center", () => {
    const result = calculateLine(line, capacity);
    expect(result.bottleneck?.workCenter).toBe("Machining");
    expect(result.premiumPct).toBe(.1);
  });
  it("calculates GST and respects a coordinator override", () => {
    const result = calculateLine({ ...line, gstPct: 12, coordinatorOverride: 50000 }, capacity);
    expect(result.sellingPrice).toBe(50000);
    expect(result.gst).toBe(6000);
    expect(result.total).toBe(56000);
  });
  it("treats zero available capacity as fully constrained", () => {
    const zero: WorkCenterCapacity[] = [{ workCenter: "Cutting", availableHours: 0, bookedHours: 0, hourlyRate: 1000 }];
    expect(projectCapacity([{ ...line, processes: [{ workCenter: "Cutting", hours: 1 }] }], zero)[0].utilization).toBe(1);
    expect(calculateLine({ ...line, processes: [{ workCenter: "Cutting", hours: 1 }] }, zero).premiumPct).toBe(.18);
  });
});
