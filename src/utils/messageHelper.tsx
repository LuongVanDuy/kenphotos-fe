import { message, Spin } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

export const customMessage = {
  loading: (content: string, key: any) => {
    message.open({
      key,
      content: (
        <div className="flex items-center border-[#1890FF] border-[1px] p-2 text-[#1890FF] font-semibold rounded-3xl" style={{background: '#E6F7FF'}}>
          <Spin
            indicator={<LoadingOutlined spin />}
            size="small"
            className="mr-2"
          />
          <span>{content}</span>
        </div>
      ),
      duration: 0,
      className: "flex justify-end",
    });
  },
  success: (content: string) => {
    message.open({
      content: (
        <div className="flex items-center   p-2  text-white font-semibold rounded-xl" style={{background: '#4CAF50'}}>
          <CheckCircleOutlined />
          <span className="ml-2">{content}</span>
        </div>
      ),
      duration: 3,
      className: "flex justify-end",
    });
  },

  error: (content: string) => {
    message.open({
      content: (
        <div className="flex items-center   p-2  text-white font-semibold rounded-xl" style={{ background: '#CA3B40' }}>
          <CloseCircleOutlined />
          <span className="ml-2">{content}</span>
        </div>
      ),
      duration: 3,
      className: "flex justify-end",
    });
  },

  warning: (content: string) => {
    message.open({
      content: (
        <div className="flex items-center p-2 text-white font-semibold rounded-xl" style={{ background: '#FFAB00' }}>
          <InfoCircleOutlined />
          <span className="ml-2">{content}</span>
        </div>
      ),
      duration: 3,
      className: "flex justify-end",
    });
  },

  destroy: (key?: string) => {
    message.destroy(key);
  },

  info: (content: string) => {
    message.open({
      content: (
        <div className="flex items-center p-2 text-white font-semibold rounded-xl" style={{ background: '#FFAB00' }}>
          <InfoCircleOutlined />
          <span className="ml-2">{content}</span>
        </div>
      ),
      duration: 3,
      className: "flex justify-end",
    });
  },
};
