// components/TinyEditor.tsx
"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
  initialValue?: string;
  onChange?: (content: string) => void;
};

export default function TinyEditor({ initialValue = "", onChange }: Props) {
  return (
    <Editor
      apiKey="uugqic22oau89v7tv4dnj3avzebaaozn347buqb9dwv7a9rb"
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: "edit insert format table",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat ",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(content: any) => {
        if (onChange) onChange(content);
      }}
    />
  );
}
