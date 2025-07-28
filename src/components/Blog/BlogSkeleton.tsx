import React from "react";

const BlogSkeleton = ({ span = 1 }: { span?: number }) => (
  <div className={`w-full h-[360px] xl:h-[440px] bg-gray-200 animate-pulse rounded-xl ${span === 2 ? "lg:col-span-2" : ""}`} />
);

export default BlogSkeleton;
