import { Modal } from "antd";
import cx from "classnames";
import type { ComponentProps, ReactNode } from "react";
import styled from "styled-components";

type SelectProps = ComponentProps<typeof Modal>;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: auto;
    border-radius: 8px;
    overflow: hidden;
    padding: 0;
  }

  .ant-modal-header {
    background-color: #f5faff;
    border-bottom: 1px solid #eaf4ff;
    padding: 16px;
    border-radius: 8px 8px 0 0;
  }

  .ant-modal-body {
    padding: 24px;
  }
`;

export function CustomModal({
  title,
  isOpen,
  onCancel,
  children,
  width,
  className,
  forceRender,
  ...rest
}: {
  title?: string | ReactNode;
  isOpen: boolean;
  onCancel: () => void;
  onSubmit?: () => void;
  children: any;
  width?: number;
  className?: string;
  forceRender?: boolean;
} & SelectProps) {
  return (
    <StyledModal
      title={title}
      width={width}
      open={isOpen}
      className={cx("custom-modal", className)}
      onCancel={onCancel}
      centered
      footer={null}
      forceRender={forceRender}
      maskClosable={false}
      {...rest}
    >
      {children}
    </StyledModal>
  );
}
