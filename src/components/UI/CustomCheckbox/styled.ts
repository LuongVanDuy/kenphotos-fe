import { Checkbox } from "antd";
import styled from "styled-components";

export const CheckboxStyled = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #0085ff !important;
    border-color: #0085ff !important;
  }

  .ant-checkbox-wrapper {
    margin-top: 5px !important;
  }
`;
