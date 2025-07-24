import React from "react";
import { Card } from "antd";

export function AdminCard(props: any) {
  return (
    <Card
      {...props}
      style={{
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        ...props.style,
      }}
    >
      {props.children}
    </Card>
  );
}
