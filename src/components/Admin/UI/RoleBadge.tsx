import React from "react";

export function RoleBadge({ role }: { role: string }) {
  let color = "#1677ff";
  let label = role;
  if (role === "admin") {
    color = "#fa541c";
    label = "Admin";
  } else if (role === "editor") {
    color = "#13c2c2";
    label = "Editor";
  } else if (role === "user") {
    color = "#bfbfbf";
    label = "User";
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
