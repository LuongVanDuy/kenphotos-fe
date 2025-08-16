"use client";

import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { customMessage } from "@/utils/message";
import { slugifyFileName } from "@/utils/renameImage";
import { getImageUrl } from "@/utils/imageUrl";
import MediaLibraryModal from "../MediaLibraryModal";

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
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

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

  // Thêm CSS cho WordPress-style editor
  const addWordPressStyleCSS = () => {
    if (typeof document === "undefined") return;

    const styleId = "quill-wordpress-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      /* Main container styling */
      .ql-container {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #1e1e1e;
        background: #fff;

        border-top: none;

        min-height: 300px;
      }

      /* Toolbar styling - WordPress style */
      .ql-toolbar {
        background: #f9f9f9;

        padding: 8px 12px;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      /* Button groups */
      .ql-toolbar .ql-formats {
        display: flex;
        align-items: center;
        gap: 2px;
        margin-right: 8px;
        padding-right: 8px;
        border-right: 1px solid #e0e0e0;
      }

      .ql-toolbar .ql-formats:last-child {
        border-right: none;
        margin-right: 0;
        padding-right: 0;
      }

      /* Button styling */
      .ql-toolbar button {
        width: 32px;
        height: 32px;
        border: 1px solid transparent;
        background: transparent;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #555;
        transition: all 0.2s ease;
        position: relative;
      }

      .ql-toolbar button:hover {
        background: #fff;
        border-color: #0073aa;
        color: #0073aa;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .ql-toolbar button.ql-active {
        background: #0073aa;
        border-color: #0073aa;
        color: #fff;
      }

      .ql-toolbar button:active {
        background: #005a87;
        border-color: #005a87;
        color: #fff;
      }

      /* Undo/Redo buttons */
      .ql-toolbar .ql-undo,
      .ql-toolbar .ql-redo {
        width: 32px;
        height: 32px;
        border: 1px solid transparent;
        background: transparent;
        cursor: pointer;
        font-size: 16px;
        border-radius: 4px;
        color: #555;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }
      
      .ql-toolbar .ql-undo:hover,
      .ql-toolbar .ql-redo:hover {
        background: #fff;
        border-color: #0073aa;
        color: #0073aa;
      }
      
      .ql-toolbar .ql-undo::before {
        content: "↶";
      }
      
      .ql-toolbar .ql-redo::before {
        content: "↷";
      }

      /* Select dropdowns */
      .ql-toolbar .ql-picker {
        height: 32px;
        border: 1px solid transparent;
        border-radius: 4px;
        background: transparent;
        color: #555;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .ql-toolbar .ql-picker:hover {
        background: #fff;
        border-color: #0073aa;
        color: #0073aa;
      }

      .ql-toolbar .ql-picker-label {
        border: none;
        padding: 0 8px;
        font-size: 14px;
        color: inherit;
      }

      .ql-toolbar .ql-picker-options {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 4px 0;
      }

      .ql-toolbar .ql-picker-item {
        padding: 6px 12px;
        font-size: 14px;
        color: #555;
        cursor: pointer;
      }

      .ql-toolbar .ql-picker-item:hover {
        background: #f0f8ff;
        color: #0073aa;
      }

      /* Color picker */
      .ql-toolbar .ql-color .ql-picker-options,
      .ql-toolbar .ql-background .ql-picker-options {
        width: 152px;
        padding: 8px;
      }

      .ql-toolbar .ql-color .ql-picker-label,
      .ql-toolbar .ql-background .ql-picker-label {
        width: 20px;
        height: 20px;
        border-radius: 2px;
        margin: 0 4px;
      }

      /* Editor content area */
      .ql-editor {
        padding: 20px;
        min-height: 280px;
        background: #fff;
        border: none;
        outline: none;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
        overflow-x: auto;
        max-width: 100%;
        transition: border-color 0.3s, background-color 0.3s;
      }

      .ql-editor:focus {
        background: #fff;
      }

      /* Placeholder styling */
      .ql-editor.ql-blank::before {
        color: #999;
        font-style: italic;
        font-size: 16px;
        left: 20px;
        right: 20px;
      }

      /* Content styling */
      .ql-editor h1 {
        font-size: 2em;
        font-weight: 600;
        margin: 0.67em 0;
        color: #1e1e1e;
      }

      .ql-editor h2 {
        font-size: 1.5em;
        font-weight: 600;
        margin: 0.83em 0;
        color: #1e1e1e;
      }

      .ql-editor h3 {
        font-size: 1.17em;
        font-weight: 600;
        margin: 1em 0;
        color: #1e1e1e;
      }

      .ql-editor p {
        margin: 0 0 1em 0;
        line-height: 1.6;
      }

      .ql-editor blockquote {
        border-left: 4px solid #0073aa;
        margin: 1.5em 0;
        padding: 0.5em 0 0.5em 1em;
        background: #f9f9f9;
        font-style: italic;
      }

      .ql-editor code {
        background: #f1f1f1;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
        font-size: 0.9em;
      }

      .ql-editor pre {
        background: #f1f1f1;
        padding: 1em;
        border-radius: 4px;
        overflow-x: auto;
        margin: 1em 0;
      }

      .ql-editor pre code {
        background: none;
        padding: 0;
      }

      /* List styling */
      .ql-editor ul,
      .ql-editor ol {
        margin: 1em 0;
        padding-left: 2em;
      }

      .ql-editor li {
        margin: 0.5em 0;
      }

      /* Link styling */
      .ql-editor a {
        color: #0073aa;
        text-decoration: underline;
      }

      .ql-editor a:hover {
        color: #005a87;
      }

      /* Table styling */
      .ql-editor table {
        width: 100%;
        max-width: 100%;
        border-collapse: collapse;
        margin: 1em 0;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
      }

      .ql-editor table td,
      .ql-editor table th {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
        vertical-align: top;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
      }

      .ql-editor table th {
        background: #f8f9fa;
        font-weight: 600;
        color: #1e1e1e;
      }

      .ql-editor table tr:nth-child(even) {
        background: #f9f9f9;
      }

      .ql-editor table tr:hover {
        background: #f0f8ff;
      }

      /* Image styling */
      .ql-editor img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1em auto;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }

      /* Drag and drop visual feedback */
      .ql-editor.drag-over {
        border: 2px dashed #0073aa !important;
        background-color: #f0f8ff !important;
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .ql-toolbar {
          padding: 6px 8px;
          gap: 2px;
        }

        .ql-toolbar button {
          width: 28px;
          height: 28px;
          font-size: 12px;
        }

        .ql-toolbar .ql-formats {
          margin-right: 4px;
          padding-right: 4px;
        }

        .ql-editor {
          padding: 16px;
          font-size: 16px;
        }
      }

      /* Focus states */
      .ql-container.ql-snow:focus-within {
        border-color: #0073aa;
        box-shadow: 0 0 0 1px #0073aa;
      }

      /* Better table module styling */
      .ql-better-table {
        border: 1px solid #ddd;
        border-radius: 4px;
        overflow: hidden;
      }

      .ql-better-table .ql-picker {
        height: 32px;
        border: 1px solid transparent;
        border-radius: 4px;
        background: transparent;
        color: #555;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .ql-better-table .ql-picker:hover {
        background: #fff;
        border-color: #0073aa;
        color: #0073aa;
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
    // Mở Media Library Modal thay vì file input
    setIsMediaModalOpen(true);
  };

  // Handle image selection from Media Library
  const handleImageSelect = (media: any) => {
    if (!editorRef.current) return;

    try {
      const range = editorRef.current.getSelection();
      if (!range) {
        // Nếu không có selection, insert ở cuối
        const length = editorRef.current.getLength();
        editorRef.current.setSelection(length, 0);
      }

      // Insert image vào editor với getImageUrl
      const imageUrl = getImageUrl(media.slug || media.url);
      if (imageUrl) {
        editorRef.current.insertEmbed(
          range?.index || editorRef.current.getLength() - 1,
          "image",
          imageUrl
        );

        // Move cursor after image
        setTimeout(() => {
          const newIndex =
            (range?.index || editorRef.current.getLength() - 1) + 1;
          editorRef.current.setSelection(newIndex, 0);
        }, 100);

        customMessage.success("Image inserted successfully!");
      }
    } catch (error) {
      console.error("Error inserting image:", error);
      customMessage.error("Failed to insert image. Please try again.");
    }
  };

  // Handle direct file upload (fallback)
  const handleDirectFileUpload = async (file: File) => {
    const isImage = file.type.startsWith("image/");
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!isImage) {
      customMessage.error("Invalid file format. Only image files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      customMessage.error("Image must be under 10MB.");
      return;
    }

    const renamedFile = new File([file], slugifyFileName(file.name), {
      type: file.type,
    });

    const messageKey = "blog-editor-image-upload";
    customMessage.loading("Uploading image...", messageKey);

    try {
      // TODO: Implement actual file upload logic here
      // const imageUrl = await uploadFileS3(renamedFile, "blog-admin-upload", "image-upload");

      // For now, create a temporary URL
      const imageUrl = URL.createObjectURL(file);

      const range = editorRef.current.getSelection();
      editorRef.current.insertEmbed(range?.index || 0, "image", imageUrl);

      customMessage.destroy(messageKey);
      customMessage.success("Image uploaded and inserted successfully!");
    } catch (err) {
      customMessage.destroy(messageKey);
      console.error("[Image Upload Error]", err);
      customMessage.error("Image upload failed. Please try again later.");
    }
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
      border: 1px solid #ddd;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-width: 240px;
    `;

    const title = document.createElement("div");
    title.textContent = "Insert Table";
    title.style.cssText = `
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1e1e1e;
      text-align: center;
    `;
    selector.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "size-grid";
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(10, 20px);
      gap: 2px;
      margin-bottom: 12px;
      justify-content: center;
    `;

    const indicator = document.createElement("div");
    indicator.textContent = "1 x 1";
    indicator.style.cssText = `
      font-size: 12px;
      color: #666;
      text-align: center;
      padding: 4px;
      background: #f9f9f9;
      border-radius: 4px;
      margin-bottom: 8px;
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
        border-radius: 2px;
      `;

      cell.onmouseenter = () => {
        // Highlight cells up to current position
        const cells = grid.children;
        for (let j = 0; j < cells.length; j++) {
          const cellRow = Math.floor(j / 10) + 1;
          const cellCol = (j % 10) + 1;
          const cellElement = cells[j] as HTMLElement;

          if (cellRow <= row && cellCol <= col) {
            cellElement.style.background = "#0073aa";
            cellElement.style.borderColor = "#0073aa";
          } else {
            cellElement.style.background = "white";
            cellElement.style.borderColor = "#ddd";
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

    selector.appendChild(indicator);
    selector.appendChild(grid);

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

      addWordPressStyleCSS();

      // Cấu hình Quill với đầy đủ tính năng
      editorRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link", "image", "table"],
              ["blockquote", "code-block"],
              ["undo", "redo"],
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

      // Handle paste events for images
      editorRef.current.root.addEventListener("paste", (e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf("image") !== -1) {
            e.preventDefault();
            const file = item.getAsFile();
            if (file) {
              handleDirectFileUpload(file);
            }
            break;
          }
        }
      });

      // Handle drag and drop for images
      editorRef.current.root.addEventListener("dragover", (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        editorRef.current.root.classList.add("drag-over");
      });

      editorRef.current.root.addEventListener("dragleave", (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        editorRef.current.root.classList.remove("drag-over");
      });

      editorRef.current.root.addEventListener("drop", (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        editorRef.current.root.classList.remove("drag-over");

        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith("image/")) {
            handleDirectFileUpload(file);
          } else {
            customMessage.error("Please drop an image file.");
          }
        }
      });

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

  return (
    <>
      <div ref={quillRef} {...props} />

      {/* Media Library Modal */}
      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onCancel={() => setIsMediaModalOpen(false)}
        onSelect={handleImageSelect}
        title="Select Image for Editor"
        accept="image/*"
      />
    </>
  );
};

export default CustomQuill;
