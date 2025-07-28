"use client";

import React, { useEffect, useState } from "react";
import { Tree } from "antd";
import { connect } from "react-redux";
import { fetchCategories } from "@/store/actions/categories";

interface Props {
  categoryList: any[];
  fetchCategories: any;
  value?: number[];
  onChange?: (value: number[]) => void;
}

const CategoryTreeSelector: React.FC<Props> = ({ categoryList, fetchCategories, value = [], onChange }) => {
  const [internalCheckedKeys, setInternalCheckedKeys] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const stringKeys = (value || []).map((id) => id.toString());
    setInternalCheckedKeys(stringKeys);
  }, [value]);

  const handleCheck = (checkedKeysValue: any) => {
    let checkedStringKeys: string[] = [];

    if (Array.isArray(checkedKeysValue)) {
      checkedStringKeys = checkedKeysValue.map((key) => key.toString());
    } else if (checkedKeysValue?.checked) {
      checkedStringKeys = checkedKeysValue.checked.map((key: any) => key.toString());
    }

    setInternalCheckedKeys(checkedStringKeys);

    const checkedNumbers = checkedStringKeys.map((key) => parseInt(key, 10)).filter((num) => !isNaN(num));

    onChange?.(checkedNumbers);
  };

  return (
    <Tree
      checkable
      treeData={categoryList}
      checkedKeys={internalCheckedKeys}
      onCheck={handleCheck}
      selectable={false}
      defaultExpandAll
      checkStrictly={false}
      style={{
        maxHeight: 300,
        overflow: "auto",
        padding: 8,
        border: "1px solid #d9d9d9",
        borderRadius: "6px",
      }}
    />
  );
};

const mapStateToProps = (state: any) => ({
  categoryList: state.categories.list,
});

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTreeSelector);
