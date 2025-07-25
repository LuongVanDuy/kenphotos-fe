import { Button } from "antd";
import cx from "classnames";
import type { ReactNode } from "react";
import { ButtonStyled } from "./styled";
import { LoadingIcon } from "@/components/Icons/LoadingIcon";

export function CustomButton({
  children,
  prefixIcon,
  suffixIcon,
  className,
  type = "primary",
  onClick,
  outline,
  wrapClassName,
  disabled = false,
  onEnter,
  isLoading,
  htmlType = "button",
}: {
  children: any;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  className?: string;
  type?:
    | "success"
    | "danger"
    | "primary"
    | "disable"
    | "original"
    | "icon"
    | "link"
    | "outline"
    | "border-color"
    | "gray"
    | "white"
    | "dark"
    | "none";
  onClick?: (value?: any) => void;
  outline?: boolean;
  wrapClassName?: string;
  disabled?: boolean;
  onEnter?: () => void;
  isLoading?: boolean;
  htmlType?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <ButtonStyled className={wrapClassName}>
      <Button
        onClick={onClick}
        type="primary"
        className={cx(
          className,
          type,
          outline ? "btn-outline" : "",
          "flex items-center",
          "custom-button-preload",
          `${isLoading && "!opacity-50"}`
        )}
        disabled={disabled}
        onKeyUp={(e) => {
          if (e.keyCode === 13 && onEnter) {
            onEnter();
          }
        }}
        htmlType={htmlType}
        style={{ opacity: 1 }} // Add this to ensure opacity is set immediately
      >
        {prefixIcon ? <div className="mr-2">{prefixIcon}</div> : null}
        {isLoading ? (
          <LoadingIcon color={type === "primary" ? "#ffff" : "#FF7B18"} />
        ) : (
          children
        )}
        {suffixIcon ? <div className="ml-2 ">{suffixIcon}</div> : null}
      </Button>
    </ButtonStyled>
  );
}
