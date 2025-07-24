import styled from "styled-components";

export const ButtonStyled = styled.div`
  .ant-btn {
    height: 44px !important;
    width: 100% !important;
    border-radius: 10px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 64px !important;
    font-weight: 500 !important;
    box-shadow: none !important;
    transition: opacity 0.3s ease !important;

    span {
      font-weight: 500 !important;
      font-size: inherit !important;
    }
  }

  .no-text {
    span {
      display: none;
    }
  }

  .no-text .mr-2 {
    margin-right: 0;
  }

  .danger {
    border: 1px solid #e50000 !important;
    background: transparent !important;
    span {
      color: #e50000 !important;
    }
    &:hover {
      background: transparent !important;
      span {
        color: #e50000 !important;
      }
    }
  }

  .gray {
    background: #f5f5f5 !important;
    color: #333333 !important;
    border: 1px solid #ebebeb !important;
    span {
      font-size: 16px !important;
    }
    &:hover {
      background: #f5f5f5 !important;
      opacity: 0.8 !important;
      color: #333333 !important;
    }
  }

  .white {
    background: white !important;
    color: #1a1a1a !important;
    border: 1px solid #ebebeb !important;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px !important;
    span {
      font-size: 12px !important;
      color: #1a1a1a !important;
    }
    &:hover {
      background: #f5f5f5 !important;
      opacity: 0.8 !important;
      color: #1a1a1a !important;
    }
  }

  .none {
    background: transparent !important;
    span {
      color: #e50000 !important;
    }
    &:hover {
      background: transparent !important;
      span {
        color: #e50000 !important;
      }
    }
  }

  .danger.btn-outline {
    span {
      font-size: inherit !important;
      color: #e50000 !important;
    }
    background: unset !important;
    color: #e50000 !important;
    border: 1px solid #e50000 !important;
  }

  .success {
    background: #00b63e !important;
    &:hover {
      opacity: 0.8 !important;
    }
  }
  .success.btn-outline {
    span {
      font-size: inherit !important;
      color: #00b63e !important;
    }
    background: unset !important;
    color: #00b63e !important;
    border: 1px solid #00b63e !important;
  }

  .primary {
    background: #0085ff !important;
    color: white !important;
    &:hover {
      background: #3355ff !important;
      opacity: 0.8 !important;
    }
  }
  .primary.btn-outline {
    span {
      font-size: inherit !important;
      color: #0085ff !important;
    }
    background: unset !important;
    color: #0085ff !important;
    border: 1px solid #0085ff !important;
  }

  .disable {
    background: #d7dfe9 !important;
    color: #6d6d6d !important;
    &:hover {
      background: #d7dfe9 !important;
      opacity: 0.8 !important;
    }
  }
  .disable.btn-outline {
    span {
      font-size: inherit !important;
      color: #6d6d6d !important;
    }
    background: unset !important;
    color: #6d6d6d !important;
    border: 1px solid #d7dfe9 !important;
  }

  .original {
    background: white !important;
    border: 1px solid #d7dfe9 !important;
    span {
      font-size: inherit !important;
      color: #1a1a1a !important;
    }
    &:hover {
      background: #f5f5f5 !important;
      border: 1px solid #0085ff !important;
      opacity: 0.8 !important;
      span {
        font-size: inherit !important;
        color: #0085ff !important;
      }
    }
  }

  .pending {
    background: #fdd33e !important;
    color: #1a1a1a !important;
    &:hover {
      background: #fdd33e !important;
      opacity: 0.8 !important;
    }
  }

  .pending.btn-outline {
    span {
      font-size: inherit !important;
      color: #1a1a1a !important;
    }
    background: unset !important;
    color: #1a1a1a !important;
    border: none !important;
  }

  .new {
    background: #d6ddff !important;
    color: #3355ff !important;
    &:hover {
      background: #d6ddff !important;
      opacity: 0.8 !important;
    }
  }
  .new.btn-outline {
    span {
      font-size: inherit !important;
      color: #3355ff !important;
    }
    background: unset !important;
    color: #3355ff !important;
    border: none !important;
  }

  .disabled {
    background: #f5f5f5 !important;
    color: #bdbdbd !important;
    &:hover {
      background: #f5f5f5 !important;
      opacity: 0.8 !important;
    }
  }
  .disabled.btn-outline {
    span {
      font-size: inherit !important;
      color: #bdbdbd !important;
    }
    background: unset !important;
    color: #bdbdbd !important;
    border: 1px solid #f5f5f5 !important;
  }

  .blue-btn {
    background: #0085ff !important;
    &:hover {
      background: #3355ff !important;
      opacity: 0.8 !important;
    }
  }
  .blue-btn span {
    font-size: inherit !important;
    color: white !important;
  }

  .blue-text {
    color: #0085ff !important;
    &:hover {
      color: #3355ff !important;
      background: none !important;
    }
  }

  .border-color {
    background: white !important;
    border: 1px solid #0085ff !important;
    span {
      font-size: inherit !important;
      color: #0085ff !important;
    }
    &:hover {
      background: white !important;
      border: 1px solid #3355ff !important;
      opacity: 0.8 !important;
      span {
        font-size: inherit !important;
        color: #3355ff !important;
      }
    }
  }

  .icon {
    padding: 4px !important;
    background: white !important;
    border: 1px solid #d7dfe9 !important;
    border-radius: 10px !important;
    span {
      margin-left: 8px !important;
      font-size: inherit !important;
      color: #0085ff !important;
    }
    &:hover {
      background: #f5f5f5 !important;
      opacity: 0.8 !important;
    }
  }
`;
