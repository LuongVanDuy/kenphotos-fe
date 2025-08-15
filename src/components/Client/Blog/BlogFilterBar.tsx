import React from "react";

interface BlogFilterBarProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
}

const BlogFilterBar: React.FC<BlogFilterBarProps> = ({ keyword, onKeywordChange, onSearch }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:mt-[-80px]">
      <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500"></div>

      <div className="w-full md:w-auto mt-6 md:mt-0">
        <div className="relative w-full md:w-[300px] mx-auto md:mx-0">
          <button onClick={onSearch} type="button" className="absolute inset-y-0 left-0 flex items-center pl-3 focus:outline-none">
            <svg
              className="w-5 h-5 text-gray-400 hover:text-gray-600 transition"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3FF]"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogFilterBar;
