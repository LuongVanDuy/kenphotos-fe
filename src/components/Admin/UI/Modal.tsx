"use client";

import React from "react";
import { Modal as AntModal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ModalProps {
  open: boolean;
  onCancel: () => void;
  onOk?: () => void;
  title: string;
  children: React.ReactNode;
  width?: number;
  loading?: boolean;
  okText?: string;
  cancelText?: string;
  showFooter?: boolean;
  customFooter?: React.ReactNode;
  destroyOnClose?: boolean;
  maskClosable?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onCancel,
  onOk,
  title,
  children,
  width = 520,
  loading = false,
  okText = "OK",
  cancelText = "Cancel",
  showFooter = true,
  customFooter,
  destroyOnClose = true,
  maskClosable = true,
}) => {
  const footer = showFooter
    ? customFooter || [
        <Button key="cancel" onClick={onCancel}>
          {cancelText}
        </Button>,
        <Button key="ok" type="primary" loading={loading} onClick={onOk}>
          {okText}
        </Button>,
      ]
    : null;

  return (
    <AntModal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={footer}
      width={width}
      destroyOnClose={destroyOnClose}
      maskClosable={maskClosable}
    >
      {children}
    </AntModal>
  );
};

// Confirmation Modal
interface ConfirmModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  type?: "info" | "success" | "error" | "warning" | "confirm";
}

export const showConfirmModal = ({
  title,
  content,
  onConfirm,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  type = "confirm",
}: ConfirmModalProps) => {
  const config = {
    title,
    content,
    okText,
    cancelText,
    onOk: onConfirm,
    onCancel,
    icon: <ExclamationCircleOutlined />,
  };

  switch (type) {
    case "info":
      AntModal.info(config);
      break;
    case "success":
      AntModal.success(config);
      break;
    case "error":
      AntModal.error(config);
      break;
    case "warning":
      AntModal.warning(config);
      break;
    default:
      AntModal.confirm(config);
  }
};

// Form Modal
interface FormModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
  width?: number;
  loading?: boolean;
  submitText?: string;
  cancelText?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
  open,
  onCancel,
  onSubmit,
  title,
  children,
  width = 600,
  loading = false,
  submitText = "Submit",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onSubmit}
      title={title}
      width={width}
      loading={loading}
      okText={submitText}
      cancelText={cancelText}
    >
      {children}
    </Modal>
  );
};

export default Modal;
