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
  const cleanupResizeRef = useRef<(() => void) | null>(null);

  // Function to calculate and set max-width for ql-editor
  const calculateAndSetEditorMaxWidth = () => {
    if (!editorRef.current || !quillRef.current) return;

    try {
      const quillContainer = editorRef.current.container;
      const toolbar = quillContainer?.querySelector(".ql-toolbar");
      const editor = quillContainer?.querySelector(".ql-editor");

      if (quillContainer && editor) {
        // Lấy width của quill container
        const containerWidth = quillContainer.offsetWidth;

        // Tính toán padding và border của container
        const containerStyle = window.getComputedStyle(quillContainer);
        const containerPadding =
          parseFloat(containerStyle.paddingLeft) +
          parseFloat(containerStyle.paddingRight);
        const containerBorder =
          parseFloat(containerStyle.borderLeftWidth) +
          parseFloat(containerStyle.borderRightWidth);

        // Tính toán width thực tế có thể sử dụng cho content
        const availableWidth =
          containerWidth - containerPadding - containerBorder;

        // Set max-width cho ql-editor
        (editor as HTMLElement).style.maxWidth = `${availableWidth}px`;

        console.log("Editor max-width set to:", availableWidth, "px");
      }
    } catch (error) {
      console.warn("Error calculating editor max-width:", error);
    }
  };

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
          let imageUrl;
          // const imageUrl = await uploadFileS3(
          //   renamedFile,
          //   "blog-admin-upload",
          //   "image-upload"
          // );
          // Use the environment variable for image URL
          const fullImageUrl = imageUrl
            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${imageUrl}`
            : imageUrl;
          const range = editorRef.current.getSelection(); // get current cursor position
          editorRef.current.insertEmbed(range.index, "image", fullImageUrl); // embed image at cursor position
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
        if (editorRef.current?.container.contains(selector)) {
          editorRef.current.container.removeChild(selector);
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

          // Focus vào cell đầu tiên và điều chỉnh table sau khi tạo
          setTimeout(() => {
            try {
              // Điều chỉnh table để responsive
              const table = quill.container.querySelector("table");
              if (table) {
                table.style.width = "100%";
                table.style.maxWidth = "100%";
                table.style.tableLayout = "fixed";
                table.style.wordWrap = "break-word";
                table.style.overflowWrap = "break-word";

                // Điều chỉnh tất cả cells
                const cells = table.querySelectorAll("td, th");
                cells.forEach((cell: any) => {
                  cell.style.minWidth = "60px";
                  cell.style.maxWidth = "200px";
                  cell.style.wordWrap = "break-word";
                  cell.style.overflowWrap = "break-word";
                  cell.style.whiteSpace = "normal";
                  cell.style.padding = "8px";
                  cell.style.border = "1px solid #ddd";
                });
              }

              // Cập nhật max-width của editor sau khi tạo table
              calculateAndSetEditorMaxWidth();

              const firstCell = quill.container.querySelector("td");
              if (firstCell && currentSelection) {
                // Sử dụng selection đã lưu thay vì lấy mới
                quill.setSelection(currentSelection.index + 1, 0);
              }
            } catch (error) {
              console.warn(
                "Could not adjust table or focus on table cell:",
                error
              );
            }
          }, 100);
        } else {
          customMessage.error("Invalid table dimensions.");
        }
      });

      if (!selector) return;

      // Position selector trong quill container
      try {
        const quillContainer = editorRef.current?.container;
        if (quillContainer) {
          // Set position relative để selector có thể định vị tuyệt đối
          quillContainer.style.position = "relative";

          // Position selector ở góc trên bên phải của editor
          selector.style.top = "5%";
          selector.style.right = "15%";
          selector.style.left = "auto";
        } else {
          // Fallback positioning
          selector.style.top = "5%";
          selector.style.right = "15%";
          selector.style.left = "auto";
        }
      } catch (error) {
        console.warn("Could not position table selector:", error);
        selector.style.top = "5%";
        selector.style.right = "15%";
        selector.style.left = "auto";
      }

      // Close selector when clicking outside or pressing Escape
      const closeSelector = (e: Event) => {
        const target = e.target as Node;

        // Kiểm tra xem click có phải là ra ngoài selector không
        if (!selector.contains(target)) {
          // Kiểm tra xem click có phải là ra ngoài quill editor không
          const quillContainer = editorRef.current?.container;
          if (quillContainer && !quillContainer.contains(target)) {
            // Click ra ngoài hoàn toàn quill editor
            if (quillContainer.contains(selector)) {
              quillContainer.removeChild(selector);
            }
            cleanupEventListeners();
          }
        }
      };

      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          const quillContainer = editorRef.current?.container;
          if (quillContainer && quillContainer.contains(selector)) {
            quillContainer.removeChild(selector);
          }
          cleanupEventListeners();
        }
      };

      // Cleanup function
      const cleanupEventListeners = () => {
        document.removeEventListener("click", closeSelector, true);
        document.removeEventListener("mousedown", closeSelector, true);
        document.removeEventListener("keydown", handleEscape, true);
      };

      // Append selector vào quill container thay vì document.body
      if (editorRef.current?.container) {
        editorRef.current.container.appendChild(selector);

        // Thêm event listeners với delay để tránh trigger ngay lập tức
        setTimeout(() => {
          document.addEventListener("click", closeSelector, true);
          document.addEventListener("mousedown", closeSelector, true);
          document.addEventListener("keydown", handleEscape, true);
        }, 100);
      }
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

      // Add CSS for table overflow handling
      const addTableOverflowCSS = () => {
        if (typeof document === "undefined") return;

        const styleId = "quill-table-overflow-styles";
        if (document.getElementById(styleId)) return;

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          .ql-editor {
            overflow-x: auto;
            max-width: 100%;
          }
          
          .ql-editor table {
            min-width: 100%;
            table-layout: fixed;
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          
          .ql-editor table td,
          .ql-editor table th {
            min-width: 60px;
            max-width: 200px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            padding: 8px;
            border: 1px solid #ddd;
          }
          
          .ql-editor table th {
            background-color: #f8f9fa;
            font-weight: 600;
          }
          
          /* Ensure table doesn't break editor layout */
          .ql-editor .ql-table {
            display: block;
            width: 100%;
            overflow-x: auto;
          }
        `;
        document.head.appendChild(style);
      };

      addTableOverflowCSS();

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
            // Cấu hình table để responsive và không vượt quá width
            tableStyles: {
              width: "100%",
              maxWidth: "100%",
              tableLayout: "fixed",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            },
            cellStyles: {
              minWidth: "60px",
              maxWidth: "200px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "normal",
              padding: "8px",
              border: "1px solid #ddd",
            },
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

      // Tính toán và set max-width cho editor
      calculateAndSetEditorMaxWidth();

      // Thêm resize listener để cập nhật max-width khi window resize
      const handleResize = () => {
        calculateAndSetEditorMaxWidth();
      };

      window.addEventListener("resize", handleResize);

      // Store handleResize reference for cleanup
      cleanupResizeRef.current = () => {
        window.removeEventListener("resize", handleResize);
      };

      setIsEditorReady(true);
      onReady?.(); // báo parent biết editor đã sẵn sàng
    });

    return () => {
      isMounted = false;
      // Cleanup resize listener
      if (cleanupResizeRef.current) {
        cleanupResizeRef.current();
      }
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
