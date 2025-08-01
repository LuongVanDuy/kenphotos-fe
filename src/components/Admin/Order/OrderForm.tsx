import React from "react";
import { Form, Input, Button, InputNumber, Select, Space, message, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface FormItem {
  serviceId: number;
  quantity: number;
  price: number;
}

interface OrderFormProps {
  form?: any;
  onFinish: (values: any) => void;
  mode: "create" | "edit";
  loading: boolean;
  initialValues?: any;
  serviceOptions: { label: string; value: string }[];
}

const OrderForm: React.FC<OrderFormProps> = ({ form, onFinish, mode, loading, initialValues, serviceOptions }) => {
  const handleFinish = (values: any) => {
    if (!values.items || values.items.length === 0) {
      message.error("Please add at least one service item.");
      return;
    }

    onFinish(values);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-4xl font-bold">{mode === "edit" ? "Edit Order" : "Add New Order"}</h1>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={initialValues || {}}>
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="space-y-6">
                <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Order Information</h3>
                  </div>
                  <div className=" flex flex-col gap-5 p-8">
                    <div className="">
                      <Row gutter={24}>
                        <Col span={12}>
                          <Row gutter={24}>
                            <Col span={12}>
                              <Form.Item
                                name="name"
                                label="Customer Name"
                                rules={[
                                  { required: true, message: "Please enter customer name" },
                                  { min: 2, message: "Name must be at least 2 characters" },
                                ]}
                              >
                                <Input placeholder="e.g. John Doe" />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                  { required: true, message: "Please enter email" },
                                  { type: "email", message: "Invalid email address" },
                                ]}
                              >
                                <Input placeholder="e.g. john.doe@example.com" />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item
                                name="phone"
                                label="Phone"
                                rules={[
                                  { required: true, message: "Please enter phone number" },
                                  {
                                    pattern: /^[0-9]{8,15}$/,
                                    message: "Phone number must be between 8–15 digits",
                                  },
                                ]}
                              >
                                <Input placeholder="e.g. 0912345678" />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter address" }]}>
                                <Input placeholder="e.g. 123 Nguyen Trai, Hanoi" />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item
                                name="inputFileUrl"
                                label="Input File URL"
                                rules={[
                                  {
                                    type: "url",
                                    message: "Please enter a valid URL (http/https)",
                                  },
                                ]}
                              >
                                <Input placeholder="e.g. https://example.com/input.jpg" />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item
                                name="outputFileUrl"
                                label="Output File URL"
                                rules={[
                                  {
                                    type: "url",
                                    message: "Please enter a valid URL (http/https)",
                                  },
                                ]}
                              >
                                <Input placeholder="e.g. https://example.com/output.jpg" />
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item name="note" label="Note">
                                <TextArea rows={3} placeholder="Optional note for this order..." />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={12}>
                          <Form.List name="items">
                            {(fields, { add, remove }) => (
                              <>
                                {fields.map(({ key, name, ...restField }, index) => (
                                  <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "serviceId"]}
                                      initialValue={form.getFieldValue("items")?.[index]?.serviceId}
                                      rules={[{ required: true, message: "Missing service" }]}
                                    >
                                      <Select
                                        placeholder="Select service"
                                        style={{ width: 200 }}
                                        options={serviceOptions.map((option) => {
                                          const selectedItems = form.getFieldValue("items") || [];
                                          const currentServiceId = selectedItems[index]?.serviceId;
                                          const isSelectedByOther = selectedItems.some(
                                            (item: any, i: number) => i !== index && item.serviceId === option.value
                                          );

                                          return {
                                            ...option,
                                            disabled: isSelectedByOther && currentServiceId !== option.value,
                                          };
                                        })}
                                        onChange={(value: number) => {
                                          const formItems: FormItem[] = form.getFieldValue("items") || [];

                                          const selectedService: any = serviceOptions.find((s: any) => s.value === value);
                                          if (selectedService) {
                                            const quantity = formItems[index]?.quantity ?? 1;

                                            formItems[index] = {
                                              serviceId: selectedService.value,
                                              quantity,
                                              price: selectedService.price * quantity,
                                            };

                                            form.setFieldsValue({ items: formItems });
                                          }
                                        }}
                                      />
                                    </Form.Item>

                                    <Form.Item
                                      {...restField}
                                      name={[name, "quantity"]}
                                      initialValue={1}
                                      rules={[{ required: true, message: "Missing quantity" }]}
                                    >
                                      <InputNumber
                                        placeholder="Quantity"
                                        min={1}
                                        onChange={(qty: any) => {
                                          const formItems: FormItem[] = form.getFieldValue("items") || [];
                                          const selectedServiceId = formItems[index]?.serviceId;
                                          const selectedService: any | undefined = serviceOptions.find((s: any) => s.value === selectedServiceId);

                                          if (selectedService) {
                                            formItems[index].quantity = qty;
                                            formItems[index].price = selectedService.price * qty;
                                            form.setFieldsValue({ items: formItems });
                                          }
                                        }}
                                      />
                                    </Form.Item>

                                    <Form.Item {...restField} name={[name, "price"]} rules={[{ required: true, message: "Missing price" }]}>
                                      <InputNumber placeholder="Price" min={0} readOnly />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                  </Space>
                                ))}

                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => add({ quantity: 1 })} // default quantity = 1
                                    block
                                    icon={<PlusOutlined />}
                                  >
                                    Add Service
                                  </Button>
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-80 flex-shrink-0">
              <div className="space-y-6">
                <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                    <h3 className="text-sm font-semibold text-gray-700">Action</h3>
                  </div>
                  <div className="p-4">
                    <Form.Item name="status" label="Status" initialValue={0}>
                      <Select>
                        <Select.Option value={0}>Pending</Select.Option>
                        <Select.Option value={1}>In Progress</Select.Option>
                        <Select.Option value={2}>Completed</Select.Option>
                        <Select.Option value={3}>Cancelled</Select.Option>
                      </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={loading} block>
                      {mode === "edit" ? "Update Order" : "Create Order"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default OrderForm;
