import React from "react";
import BlogSkeleton from "./BlogSkeleton";
import BlogCard from "./BlogCard";

const BlogBlock: React.FC<{
  group: any[];
  blockIndex: number;
  isLoadingBlock: boolean;
  blockRef?: React.RefObject<HTMLDivElement>;
}> = ({ group, blockIndex, isLoadingBlock, blockRef }) => {
  const topBlock = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" ref={isLoadingBlock ? blockRef : null}>
      {isLoadingBlock ? (
        blockIndex % 2 === 0 ? (
          <>
            <BlogSkeleton span={2} />
            <BlogSkeleton />
          </>
        ) : (
          <>
            <BlogSkeleton />
            <BlogSkeleton span={2} />
          </>
        )
      ) : blockIndex % 2 === 0 ? (
        <>
          <div className="lg:col-span-2">
            <BlogCard blog={group[0]} />
          </div>
          {group[1] && <BlogCard blog={group[1]} />}
        </>
      ) : (
        <>
          <BlogCard blog={group[0]} />
          {group[1] && (
            <div className="lg:col-span-2">
              <BlogCard blog={group[1]} />
            </div>
          )}
        </>
      )}
    </div>
  );

  const bottomBlock = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {isLoadingBlock ? [0, 1, 2].map((idx) => <BlogSkeleton key={idx} />) : group.slice(2).map((b) => <BlogCard key={b.id} blog={b} />)}
    </div>
  );

  return (
    <>
      {topBlock}
      {bottomBlock}
    </>
  );
};

export default BlogBlock;
