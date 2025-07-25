import React from "react";
import { Button } from "antd";

export function AdminButton({ children, type = "primary", ...rest }: any) {
  return (
    <Button type={type} {...rest}>
      {children}
    </Button>
  );
}
