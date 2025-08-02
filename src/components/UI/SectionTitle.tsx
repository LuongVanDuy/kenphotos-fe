import React from "react";

interface SectionTitleProps {
  title: string;
  topText?: string;
  bottomText?: string | React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  topText,
  bottomText,
}) => (
  <div className="space-y-6 text-start">
    {topText && (
      <p className="text-[19px] font-medium">
        <span className="text-[#F9B02A]">/</span>{" "}
        <span className="text-black">{topText}</span>
      </p>
    )}
    <h2 className="text-2xl md:text-[43px] font-semibold text-black leading-tight">
      {title}
    </h2>
    {bottomText && (
      <p className="text-[19px] text-[#866E3D]">
        {typeof bottomText === "string"
          ? bottomText.split("\n").map((line, idx, arr) => (
              <React.Fragment key={idx}>
                {line}
                {idx !== arr.length - 1 && <br />}
              </React.Fragment>
            ))
          : bottomText}
      </p>
    )}
  </div>
);

export default SectionTitle;
