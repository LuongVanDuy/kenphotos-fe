import React from "react";

interface MainTitleProps {
  title: any;
  subTitle?: string;
  content?: string | React.ReactNode;
  align?: "center" | "left";
}

const MainTitle: React.FC<MainTitleProps> = ({ title, subTitle, content, align = "center" }) => {
  const alignmentClass = align === "left" ? "text-left md:text-left" : "text-center md:text-center";
  const contentClass = align === "left" ? "text-[#40454E]" : "text-[#40454E] max-w-[1280px] mx-auto";

  return (
    <div className={`space-y-6 ${alignmentClass}`}>
      <h2
        className="text-[24px] leading-[30px] mb-3 font-semibold
         md:text-[52px] md:leading-[62px] md:mb-0"
      >
        {title}
      </h2>
      {subTitle && <p className="my-[30px] mb-[10px] text-[22px] md:text-[24px] leading-[24px] text-[#40454E]">{subTitle}</p>}
      {content && <p className={contentClass}>{content}</p>}
    </div>
  );
};

export default MainTitle;
