import type { CapacityProjection, QuoteLine, WorkCenterCapacity, WorkCenterName } from "./types";

export const premiumForUtilization = (utilization: number) => {
  if (utilization < 0.7) return 0;
  if (utilization < 0.85) return 0.05;
  if (utilization < 0.95) return 0.1;
  return 0.18;
};

export function projectCapacity(lines: QuoteLine[], capacities: WorkCenterCapacity[]): CapacityProjection[] {
  return capacities.map((capacity) => {
    const requiredHours = lines.flatMap((line) => line.processes)
      .filter((process) => process.workCenter === capacity.workCenter)
      .reduce((sum, process) => sum + Number(process.hours || 0), 0);
    const utilization = capacity.availableHours <= 0
      ? 1
      : (capacity.bookedHours + requiredHours) / capacity.availableHours;
    return { workCenter: capacity.workCenter, requiredHours, utilization };
  });
}

export function calculateLine(line: QuoteLine, capacities: WorkCenterCapacity[]) {
  const rateByCenter = new Map(capacities.map((capacity) => [capacity.workCenter, capacity.hourlyRate]));
  const processCost = line.processes.reduce(
    (sum, process) => sum + Number(process.hours || 0) * (rateByCenter.get(process.workCenter) || 0), 0,
  );
  const directCost = Number(line.materialCost || 0) + processCost + Number(line.toolingCost || 0) + Number(line.packagingCost || 0);
  const projection = projectCapacity([line], capacities).filter((item) => item.requiredHours > 0);
  const bottleneck = projection.sort((a, b) => b.utilization - a.utilization)[0];
  const premiumPct = premiumForUtilization(bottleneck?.utilization ?? 0);
  const baseSellingPrice = directCost * (1 + Number(line.marginPct || 0) / 100);
  const recommendedPrice = baseSellingPrice * (1 + premiumPct);
  const sellingPrice = line.coordinatorOverride && line.coordinatorOverride > 0 ? Number(line.coordinatorOverride) : recommendedPrice;
  const gst = sellingPrice * (Number(line.gstPct || 0) / 100);
  return { processCost, directCost, baseSellingPrice, premiumPct, recommendedPrice, sellingPrice, gst, total: sellingPrice + gst, bottleneck };
}

export function calculateQuote(lines: QuoteLine[], capacities: WorkCenterCapacity[]) {
  const lineTotals = lines.map((line) => calculateLine(line, capacities));
  return {
    lineTotals,
    subtotal: lineTotals.reduce((sum, line) => sum + line.sellingPrice, 0),
    gst: lineTotals.reduce((sum, line) => sum + line.gst, 0),
    total: lineTotals.reduce((sum, line) => sum + line.total, 0),
    projection: projectCapacity(lines, capacities),
  };
}

export const workCenterLabel = (value: WorkCenterName) => value;
