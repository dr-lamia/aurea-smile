/**
 * Utilities for measurement, ratio, and CSV export.
 */
export const exportMeasurementsCSV = (dsdParams: any) => {
  const rows = [
    ["Measurement", "Value"],
    ...Object.entries(dsdParams).map(([k, v]) => [k, JSON.stringify(v)]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "smile_measurements.csv";
  link.click();
  URL.revokeObjectURL(url);
};