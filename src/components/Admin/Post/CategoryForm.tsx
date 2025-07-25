"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Spin, TreeSelect } from "antd";
import { CustomInput, CustomTextarea } from "@/components/Admin/UI/CustomInput";
import type { DataNode } from "antd/es/tree";

const schema = yup.object({
  name: yup.string().required("Name is required").defined(),
  slug: yup.string().required("Slug is required").defined(),
  description: yup.string().required("Description is required").defined(),
  parentId: yup.number().min(0, "Parent ID must be >= 0").optional().defined(),
});

export interface CategoryFormValues {
  name: string;
  slug: string;
  description: string;
  parentId: number;
}

interface CategoryFormProps {
  initialValues?: Partial<CategoryFormValues>;
  onSubmit: (values: CategoryFormValues) => void;
  loading?: boolean;
  mode?: "create" | "edit";
  categories?: { id: number; name: string }[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues = {},
  onSubmit,
  loading,
  mode = "create",
  categories = [],
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialValues.name || "",
      slug: initialValues.slug || "",
      description: initialValues.description || "",
      parentId: initialValues.parentId,
    },
  });

  // Convert flat categories to treeData
  function buildTree(
    flat: { id: number; name: string; parentId?: number }[],
    parentId: number | null = null
  ): DataNode[] {
    return flat
      .filter((cat) => (cat.parentId ?? null) === parentId)
      .map((cat) => ({
        title: cat.name,
        value: cat.id,
        key: cat.id,
        children: buildTree(flat, cat.id),
      }));
  }
  const treeData = buildTree(categories);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <CustomInput {...register("name")} placeholder="Name" bordered />
        {errors.name && (
          <div className="text-red-500 text-xs mt-1">{errors.name.message}</div>
        )}
      </div>
      <div className="mb-4">
        <CustomInput {...register("slug")} placeholder="Slug" bordered />
        {errors.slug && (
          <div className="text-red-500 text-xs mt-1">{errors.slug.message}</div>
        )}
      </div>
      <div className="mb-4">
        <CustomTextarea
          {...register("description")}
          placeholder="Description"
          rows={2}
        />
        {errors.description && (
          <div className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </div>
        )}
      </div>
      <div className="mb-4">
        <TreeSelect
          style={{ width: "100%" }}
          value={watch("parentId") ?? undefined}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          treeData={treeData}
          placeholder="Select parent category (optional)"
          allowClear
          treeDefaultExpandAll
          onChange={(v) => setValue("parentId", v)}
        />
        {errors.parentId && (
          <div className="text-red-500 text-xs mt-1">
            {errors.parentId.message}
          </div>
        )}
      </div>
      <Button type="primary" htmlType="submit" loading={loading} block>
        {mode === "edit" ? "Update" : "Create"} Category
      </Button>
    </form>
  );
};

export default CategoryForm;
