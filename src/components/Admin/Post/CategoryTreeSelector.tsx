"use client";

import React, { useEffect, useState } from "react";
import { Checkbox, Tree } from "antd";
import { connect } from "react-redux";
import { fetchCategories } from "@/store/actions/categories";
import { useSession } from "next-auth/react";

interface Props {
  categoryList: any[];
  fetchCategories: any;
  value?: number[];
  onChange?: (value: number[]) => void;
}

const CategoryTreeSelector: React.FC<Props> = ({ categoryList, fetchCategories, value = [], onChange }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      fetchCategories({}, session?.accessToken);
    }
  }, [session?.accessToken]);

  return (
    <Checkbox.Group value={value} onChange={onChange}>
      {categoryList.map((cat: any) => (
        <Checkbox key={cat.id} value={cat.id} style={{ marginLeft: cat.level * 20 }}>
          {cat.name}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};

const mapStateToProps = (state: any) => ({
  categoryList: state.categories.list,
});

const mapDispatchToProps = {
  fetchCategories: fetchCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTreeSelector);
