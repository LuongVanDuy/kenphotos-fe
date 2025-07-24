import React from "react";

export function StatusBadge({ status }: { status: string }) {
  let color = "#52c41a";
  let label = status;
  if (status === "active") {
    color = "#52c41a";
    label = "Active";
  } else if (status === "inactive") {
    color = "#bfbfbf";
    label = "Inactive";
  } else if (status === "pending") {
    color = "#faad14";
    label = "Pending";
  }
  return (
    <span
      style={{
        background: color,
        color: "#fff",
        borderRadius: 4,
        padding: "2px 8px",
        fontSize: 12,
        fontWeight: 500,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}
