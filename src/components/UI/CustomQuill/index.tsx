"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { customMessage } from "@/utils/messageHelper";
import { slugifyFileName } from "@/utils/renameUploadedImage";

// Interface cho props của CustomQuill
interface CustomQuillProps {
  value?: string;
  onChange: (value: string) => void;
  onReady?: () => void;
  [key: string]: any; // Cho phép thêm các props khác
}

const CustomQuill: React.FC<CustomQuillProps> = ({
  value,
  onChange,
  placeholder,
  onReady,
  ...props
}) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null); // Dùng any hoặc import kiểu từ @types/quill nếu cần
  const [isEditorReady, setIsEditorReady] = useState(false);

  // Add undo/redo functions với kiểm tra tốt hơn
  const handleUndo = () => {
    if (editorRef.current && editorRef.current.history) {
      try {
        editorRef.current.history.undo();

        // Trigger change event để cập nhật content
        setTimeout(() => {
          const content = editorRef.current?.root?.innerHTML || "";
          onChange(content);
        }, 50);
      } catch (error) {
        console.warn("Error during undo:", error);
      }
    }
  };

  const handleRedo = () => {
    if (editorRef.current && editorRef.current.history) {
      try {
        editorRef.current.history.redo();

        // Trigger change event để cập nhật content
        setTimeout(() => {
          const content = editorRef.current?.root?.innerHTML || "";
          onChange(content);
        }, 50);
      } catch (error) {
        console.warn("Error during redo:", error);
      }
    }
  };

  // Thêm CSS cho undo/redo buttons
  const addUndoRedoCSS = () => {
    if (typeof document === "undefined") return;

    const styleId = "quill-undo-redo-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .ql-toolbar .ql-undo,
      .ql-toolbar .ql-redo {
        width: 28px;
        height: 28px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 16px;
        border-radius: 3px;
        margin-right: 2px;
        color: #444;
        display: inline-block;
        vertical-align: top;
      }
      
      .ql-toolbar .ql-undo:hover,
      .ql-toolbar .ql-redo:hover {
        background-color: #f0f0f0;
      }
      
      .ql-toolbar .ql-undo:active,
      .ql-toolbar .ql-redo:active {
        background-color: #e0e0e0;
      }
      
      .ql-toolbar .ql-undo::before {
        content: "↶";
      }
      
      .ql-toolbar .ql-redo::before {
        content: "↷";
      }
    `;
    document.head.appendChild(style);
  };

  // Add keyboard shortcuts for undo/redo với cải thiện
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Chỉ xử lý khi editor đang focus
      if (!isEditorReady || !editorRef.current) return;

      const isQuillFocused = editorRef.current.container.contains(
        document.activeElement
      );
      if (!isQuillFocused) return;

      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        handleUndo();
      } else if (
        ((e.ctrlKey || e.metaKey) && e.key === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z")
      ) {
        e.preventDefault();
        e.stopPropagation();
        handleRedo();
      }
    };

    if (isEditorReady && editorRef.current) {
      // Attach listener to document
      document.addEventListener("keydown", handleKeyDown, true);

      // Also attach to the editor container for better handling
      const editorContainer = editorRef.current.container;
      if (editorContainer) {
        editorContainer.addEventListener("keydown", handleKeyDown, true);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      if (editorRef.current?.container) {
        editorRef.current.container.removeEventListener(
          "keydown",
          handleKeyDown,
          true
        );
      }
    };
  }, [isEditorReady]);

  const uploadImage = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      // triggered when file is selected
      const file = input.files?.[0];
      const isImage = file!.type.startsWith("image/");

      const maxSize = 10 * 1024 * 1024;

      if (!isImage) {
        customMessage.error(
          "Invalid file format. Only image files are allowed."
        );
        return;
      }

      if (file!.size > maxSize) {
        customMessage.error("Image must be under 10MB.");
        return;
      }

      const renamedFile = new File([file!], slugifyFileName(file!.name), {
        type: file!.type,
      });

      if (file && renamedFile) {
        const messageKey = "blog-editor-image-upload";
        customMessage.loading("Uploading blog editor image...", messageKey);

        try {
          let imageUrl
          // const imageUrl = await uploadFileS3(
          //   renamedFile,
          //   "blog-admin-upload",
          //   "image-upload"
          // );
          const range = editorRef.current.getSelection(); // get current cursor position
          editorRef.current.insertEmbed(range.index, "image", imageUrl); // embed image at cursor position
          customMessage.destroy(messageKey);
          customMessage.success("Blog Image editor created successfully!");
        } catch (err) {
          customMessage.destroy(messageKey);
          console.error("[Image Upload Error]", err);
          customMessage.error(
            "Blog Editor Image creation failed. Please try again later."
          );
        }
      }
    };
  };

  // Create table size selector UI
  const createTableSizeSelector = (
    onSelect: (rows: number, cols: number) => void
  ) => {
    if (typeof window === "undefined") return null;

    const selector = document.createElement("div");
    selector.className = "table-size-selector";
    selector.style.cssText = `
      position: absolute;
      background: white;
      border: 1px solid #ccc;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      padding: 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    const title = document.createElement("div");
    title.textContent = "Select table size";
    title.style.cssText = `
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: #333;
    `;
    selector.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "size-grid";
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(10, 20px);
      gap: 2px;
      margin-bottom: 8px;
    `;

    const indicator = document.createElement("div");
    indicator.textContent = "1 x 1";
    indicator.style.cssText = `
      font-size: 12px;
      color: #666;
      text-align: center;
    `;

    // Create 8x10 grid of cells
    for (let i = 0; i < 80; i++) {
      const cell = document.createElement("div");
      const row = Math.floor(i / 10) + 1;
      const col = (i % 10) + 1;

      cell.style.cssText = `
        width: 20px;
        height: 20px;
        border: 1px solid #ddd;
        cursor: pointer;
        background: white;
        transition: background-color 0.1s;
      `;

      cell.onmouseenter = () => {
        // Highlight cells up to current position
        const cells = grid.children;
        for (let j = 0; j < cells.length; j++) {
          const cellRow = Math.floor(j / 10) + 1;
          const cellCol = (j % 10) + 1;
          const cellElement = cells[j] as HTMLElement;

          if (cellRow <= row && cellCol <= col) {
            cellElement.style.background = "#e3f2fd";
          } else {
            cellElement.style.background = "white";
          }
        }
        indicator.textContent = `${row} x ${col}`;
      };

      cell.onclick = () => {
        onSelect(row, col);
        if (document.body.contains(selector)) {
          document.body.removeChild(selector);
        }
      };

      grid.appendChild(cell);
    }

    selector.appendChild(grid);
    selector.appendChild(indicator);

    return selector;
  };

  const insertTable = () => {
    if (typeof window === "undefined" || !editorRef.current) return;

    const quill = editorRef.current;
    const tableModule = quill.getModule("better-table");

    if (tableModule) {
      const selector = createTableSizeSelector((rows: number, cols: number) => {
        if (rows > 0 && cols > 0 && rows <= 8 && cols <= 10) {
          const currentSelection = quill.getSelection();

          tableModule.insertTable(rows, cols);
          customMessage.success(`Table ${rows}x${cols} inserted successfully!`);

          // Focus vào cell đầu tiên sau khi tạo table
          setTimeout(() => {
            try {
              const firstCell = quill.container.querySelector("td");
              if (firstCell && currentSelection) {
                // Sử dụng selection đã lưu thay vì lấy mới
                quill.setSelection(currentSelection.index + 1, 0);
              }
            } catch (error) {
              console.warn("Could not focus on table cell:", error);
            }
          }, 100);
        } else {
          customMessage.error("Invalid table dimensions.");
        }
      });

      if (!selector) return;

      // Position selector với error handling
      try {
        const toolbar = quillRef.current?.querySelector(".ql-toolbar");
        if (toolbar) {
          const rect = toolbar.getBoundingClientRect();
          selector.style.top = `${rect.bottom + 5}px`;
          selector.style.left = `${rect.left}px`;
        } else {
          // Fallback positioning nếu không tìm thấy toolbar
          selector.style.top = "50px";
          selector.style.left = "50px";
        }
      } catch (error) {
        console.warn("Could not position table selector:", error);
        selector.style.top = "50px";
        selector.style.left = "50px";
      }

      // Close selector when clicking outside
      const closeSelector = (e: Event) => {
        if (!selector.contains(e.target as Node)) {
          if (document.body.contains(selector)) {
            document.body.removeChild(selector);
          }
          document.removeEventListener("click", closeSelector);
        }
      };

      document.body.appendChild(selector);
      setTimeout(() => document.addEventListener("click", closeSelector), 0);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (typeof window === "undefined") return;

    // Import động các thư viện chỉ chạy trên client
    Promise.all([
      import("quill"),
      // @ts-expect-error: No types for 'quill-better-table'
      import("quill-better-table"),
      // @ts-expect-error: No types for 'quill-better-table/dist/quill-better-table.css'
      import("quill-better-table/dist/quill-better-table.css"),
    ]).then(([QuillModule, QuillBetterTableModule]) => {
      if (!isMounted || !quillRef.current || editorRef.current) return;

      const Quill = QuillModule.default;
      const QuillBetterTable = QuillBetterTableModule.default;

      Quill.register(
        {
          "modules/better-table": QuillBetterTable,
        },
        true
      );

      const Formula: any = Quill.import("formats/formula");
      Quill.register(Formula, true);

      addUndoRedoCSS();

      // Cấu hình Quill với đầy đủ tính năng
      editorRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["undo", "redo"],
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              ["link", "image", "video", "formula"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["table"],
              ["clean"],
            ],
            handlers: {
              image: uploadImage,
              table: insertTable,
              undo: handleUndo,
              redo: handleRedo,
            },
          },
          "better-table": {
            operationMenu: {
              items: {
                unmergeCells: { text: "Unmerge cells" },
                mergeCells: { text: "Merge cells" },
                insertColumnRight: { text: "Insert column right" },
                insertColumnLeft: { text: "Insert column left" },
                insertRowUp: { text: "Insert row above" },
                insertRowDown: { text: "Insert row below" },
                deleteColumn: { text: "Delete column" },
                deleteRow: { text: "Delete row" },
                deleteTable: { text: "Delete table" },
              },
              color: {
                colors: [
                  "#ffffff",
                  "#f8f9fa",
                  "#e9ecef",
                  "#dee2e6",
                  "#ced4da",
                  "#adb5bd",
                  "#6c757d",
                  "#495057",
                  "#343a40",
                  "#212529",
                  "#fff3cd",
                  "#ffeaa7",
                  "#fdcb6e",
                  "#e17055",
                  "#d63031",
                  "#74b9ff",
                  "#0984e3",
                  "#00b894",
                  "#00cec9",
                  "#6c5ce7",
                ],
                text: "Background Colors:",
              },
            },
            menus: [
              "column",
              "row",
              "merge",
              "table",
              "cell",
              "wrap",
              "copy",
              "delete",
            ],
            // Thêm config để preserve table structure khi undo/redo
            tableId: () => Math.random().toString(36).substr(2, 9),
            toolbarId: () => Math.random().toString(36).substr(2, 9),
          },
          keyboard: {
            bindings: QuillBetterTable.keyboardBindings,
          },
          history: {
            delay: 1000,
            maxStack: 500,
            userOnly: true,
          },
        },
        placeholder: placeholder,
      });

      // Override update contents để tránh mất table structure khi undo/redo
      const originalUpdateContents = editorRef.current.updateContents;
      editorRef.current.updateContents = function (delta: any, source: any) {
        try {
          return originalUpdateContents.call(this, delta, source);
        } catch (error) {
          console.warn("Error updating contents:", error);
          // Fallback: set HTML directly nếu delta update fails
          if (typeof delta === "string") {
            this.root.innerHTML = delta;
          }
        }
      };

      // Cập nhật giá trị ban đầu từ Controller sau một khoảng thời gian ngắn
      setTimeout(() => {
        if (value) {
          try {
            editorRef.current.root.innerHTML = value;
          } catch (error) {
            console.warn("Error setting initial value:", error);
          }
        }
      }, 0);

      // Lắng nghe sự thay đổi trong editor với error handling
      editorRef.current.on(
        "text-change",
        (delta: any, oldDelta: any, source: any) => {
          try {
            const content = editorRef.current.root.innerHTML;
            onChange(content);
          } catch (error) {
            console.warn("Error getting editor content:", error);
          }
        }
      );

      setIsEditorReady(true);
      onReady?.(); // báo parent biết editor đã sẵn sàng
    });

    return () => {
      isMounted = false;
    };
  }, [onChange]);

  useEffect(() => {
    if (
      isEditorReady &&
      editorRef.current &&
      value !== editorRef.current.root.innerHTML &&
      typeof value === "string"
    ) {
      editorRef.current.root.innerHTML = value || "";
    }
  }, [value, isEditorReady]);

  return <div ref={quillRef} {...props} />;
};

export default CustomQuill;
