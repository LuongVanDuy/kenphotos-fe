"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Switch,
  Radio,
  Checkbox,
  Button,
  Card,
  Row,
  Col,
  message,
  Typography,
  Space,
  Alert,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { UploadProps, FormItemProps } from "antd";
import { AdminButton } from "./StyledComponents";
import { designTokens } from "./theme";

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

// Enhanced Form Item wrapper with modern styling
interface FormFieldProps extends FormItemProps {
  children: React.ReactNode;
  description?: string;
  tooltip?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  description,
  tooltip,
  required = false,
  error,
  success = false,
  label,
  ...props
}) => {
  const labelElement = label ? (
    <div className="flex items-center space-x-2">
      <Text
        style={{
          fontWeight: 500,
          color: designTokens.colors.neutral[700],
          fontSize: '14px',
        }}
      >
        {label}
        {required && (
          <span style={{ color: designTokens.colors.error[500], marginLeft: '4px' }}>
            *
          </span>
        )}
      </Text>
      {tooltip && (
        <InfoCircleOutlined
          style={{
            color: designTokens.colors.neutral[400],
            fontSize: '12px',
          }}
          title={tooltip}
        />
      )}
    </div>
  ) : undefined;

  return (
    <Form.Item
      {...props}
      label={labelElement}
      style={{
        marginBottom: '24px',
        ...props.style,
      }}
    >
      <div>
        {children}
        {description && (
          <Text
            style={{
              fontSize: '12px',
              color: designTokens.colors.neutral[500],
              display: 'block',
              marginTop: '6px',
            }}
          >
            {description}
          </Text>
        )}
        {error && (
          <Text
            style={{
              fontSize: '12px',
              color: designTokens.colors.error[500],
              display: 'flex',
              alignItems: 'center',
              marginTop: '6px',
            }}
          >
            <ExclamationCircleOutlined style={{ marginRight: '4px' }} />
            {error}
          </Text>
        )}
        {success && (
          <Text
            style={{
              fontSize: '12px',
              color: designTokens.colors.success[500],
              display: 'flex',
              alignItems: 'center',
              marginTop: '6px',
            }}
          >
            <CheckCircleOutlined style={{ marginRight: '4px' }} />
            Field validated successfully
          </Text>
        )}
      </div>
    </Form.Item>
  );
};

// Modern Text Input Field
interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  tooltip?: string;
  type?: "text" | "email" | "password" | "url" | "number";
  maxLength?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "small" | "middle" | "large";
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  description,
  tooltip,
  type = "text",
  maxLength,
  prefix,
  suffix,
  size = "large",
  disabled = false,
}) => (
  <FormField
    name={name}
    label={label}
    description={description}
    tooltip={tooltip}
    required={required}
    rules={[
      { required, message: `Please input ${label.toLowerCase()}!` },
      type === "email" && { type: "email", message: "Please enter a valid email!" },
      type === "url" && { type: "url", message: "Please enter a valid URL!" },
    ].filter(Boolean)}
  >
    <Input
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      showCount={!!maxLength}
      prefix={prefix}
      suffix={suffix}
      size={size}
      disabled={disabled}
      style={{
        borderRadius: designTokens.borderRadius.lg,
        border: `1px solid ${designTokens.colors.neutral[300]}`,
        fontSize: '14px',
      }}
      className="admin-focus"
    />
  </FormField>
);

// Textarea Field
interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  rows?: number;
  maxLength?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  description,
  rows = 4,
  maxLength,
}) => (
  <FormField
    name={name}
    label={label}
    description={description}
    rules={[{ required, message: `Please input ${label.toLowerCase()}!` }]}
  >
    <TextArea
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      showCount={!!maxLength}
    />
  </FormField>
);

// Select Field
interface SelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  options: { value: string | number; label: string }[];
  mode?: "multiple" | "tags";
  allowClear?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  description,
  options,
  mode,
  allowClear = true,
}) => (
  <FormField
    name={name}
    label={label}
    description={description}
    rules={[{ required, message: `Please select ${label.toLowerCase()}!` }]}
  >
    <Select
      placeholder={placeholder}
      mode={mode}
      allowClear={allowClear}
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  </FormField>
);

// Date Picker Field
interface DateFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  showTime?: boolean;
  format?: string;
}

export const DateField: React.FC<DateFieldProps> = ({
  name,
  label,
  placeholder,
  required = false,
  description,
  showTime = false,
  format,
}) => (
  <FormField
    name={name}
    label={label}
    description={description}
    rules={[{ required, message: `Please select ${label.toLowerCase()}!` }]}
  >
    <DatePicker
      placeholder={placeholder}
      showTime={showTime}
      format={format}
      style={{ width: "100%" }}
    />
  </FormField>
);

// File Upload Field
interface UploadFieldProps {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  accept?: string;
  maxCount?: number;
  listType?: "text" | "picture" | "picture-card";
  action?: string;
}

export const UploadField: React.FC<UploadFieldProps> = ({
  name,
  label,
  required = false,
  description,
  accept,
  maxCount = 1,
  listType = "text",
  action = "/api/upload",
}) => {
  const uploadProps: UploadProps = {
    name: "file",
    action,
    accept,
    maxCount,
    listType,
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <FormField
      name={name}
      label={label}
      description={description}
      rules={[{ required, message: `Please upload ${label.toLowerCase()}!` }]}
      valuePropName="fileList"
      getValueFromEvent={(e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      }}
    >
      <Upload {...uploadProps}>
        {listType === "picture-card" ? (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        ) : (
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        )}
      </Upload>
    </FormField>
  );
};

// Switch Field
interface SwitchFieldProps {
  name: string;
  label: string;
  description?: string;
  checkedChildren?: string;
  unCheckedChildren?: string;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  description,
  checkedChildren,
  unCheckedChildren,
}) => (
  <FormField
    name={name}
    label={label}
    description={description}
    valuePropName="checked"
  >
    <Switch
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
    />
  </FormField>
);

// Radio Group Field
interface RadioFieldProps {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  options: { value: string | number; label: string }[];
  direction?: "horizontal" | "vertical";
}

export const RadioField: React.FC<RadioFieldProps> = ({
  name,
  label,
  required = false,
  description,
  options,
  direction = "horizontal",
}) => (
  <FormField
    name={name}
    label={label}
    description={description}
    rules={[{ required, message: `Please select ${label.toLowerCase()}!` }]}
  >
    <Radio.Group>
      {direction === "vertical" ? (
        <div className="space-y-2">
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </div>
      ) : (
        <div className="space-x-4">
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </div>
      )}
    </Radio.Group>
  </FormField>
);

// Form Actions
interface FormActionsProps {
  loading?: boolean;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  loading = false,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  showCancel = true,
}) => (
  <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        paddingTop: '24px',
        borderTop: `1px solid ${designTokens.colors.neutral[200]}`,
      }}
    >
      {showCancel && (
        <AdminButton
          onClick={onCancel}
          colorScheme="neutral"
          size="middle"
          style={{ height: '48px', minWidth: '120px' }}
        >
          {cancelText}
        </AdminButton>
      )}
      <AdminButton
        type="primary"
        htmlType="submit"
        loading={loading}
        colorScheme="primary"
        size="middle"
        style={{ height: '48px', minWidth: '120px' }}
      >
        {submitText}
      </AdminButton>
    </div>
  </Form.Item>
);
