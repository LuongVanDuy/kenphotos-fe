"use client";

import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadProps } from "antd";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const { Dragger } = Upload;

const UploadCreate = () => {
  const { data: session } = useSession();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const uploadProps: UploadProps = {
    name: "files",
    multiple: true,
    action: `${process.env.apiUrl}/media/upload`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    showUploadList: {
      showRemoveIcon: false,
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} tải lên thành công`);
        setUploadedFiles((prev) => [...prev, info.file.response?.data || info.file]);
      } else if (status === "error") {
        message.error(`${info.file.name} tải lên thất bại`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Dragger {...uploadProps} className="block h-auto">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Nhấn hoặc kéo thả file vào đây để tải lên</p>
        <p className="ant-upload-hint">Hỗ trợ tải lên nhiều file. Không tải dữ liệu nhạy cảm hoặc bị cấm.</p>
      </Dragger>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {uploadedFiles.map((file) => {
          const url = file.response?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${file.response.url}` : null;

          const isImage = /\.(jpe?g|png|gif|svg|webp)$/i.test(file.name);

          return (
            <div key={file.uid} className="p-2 border rounded shadow-sm">
              {url && isImage ? (
                <img src={url} alt={file.name} className="w-full h-auto object-cover max-h-[150px]" />
              ) : (
                <div className="text-sm text-gray-500">{file.name}</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UploadCreate;
