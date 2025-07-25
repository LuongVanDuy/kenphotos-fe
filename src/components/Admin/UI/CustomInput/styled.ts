import styled from "styled-components";

export const InputStyled = styled.div`
  .hide-arrow::-webkit-inner-spin-button,
  .hide-arrow::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input-center input {
    text-align: center;
  }

  .ant-input {
    border: 1px solid #d7dfe9;
    border-radius: 8px;
    font-weight: 500;
    &:focus, &.ant-input-focused {
      border-color: #0085ff;
      box-shadow: 0 0 0 2px rgba(0,133,255,0.1);
    }
    &::placeholder {
      color: #bdbdbd;
      opacity: 1;
    }
  }

  .ant-input-disabled {
    background-color: #f5f5f5;
    color: #bdbdbd;
    font-weight: 500;
    border-color: #ebebeb;
  }
`;
