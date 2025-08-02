"use client";

import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchPublicPosts } from "@/store/actions/posts";

import BlogBlock from "@/components/Blog/BlogBlock";
import BlogSkeleton from "@/components/Blog/BlogSkeleton";
import BlogFilterBar from "@/components/Blog/BlogFilterBar";

const BlogPage = ({
  fetchPublicPosts,
  postList,
  postTotal,
  postLoading,
}: any) => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [loadingNext, setLoadingNext] = useState(false);
  const blockRef = useRef<HTMLDivElement | null>(null);

  const [localPosts, setLocalPosts] = useState<any[]>([]);

  useEffect(() => {
    handleQuery("", 1);
  }, []);

  useEffect(() => {
    if (page === 1) {
      setLocalPosts(postList);
    } else {
      setLocalPosts((prev) => [...prev, ...postList]);
    }
  }, [postList]);

  const handleQuery = (searchText: string, nextPage: number) => {
    fetchPublicPosts({
      limitWords: 0,
      search: searchText,
      page: nextPage,
      itemsPerPage: pageSize,
    });
    setPage(nextPage);
  };

  const scrollToBlock = () => {
    if (blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (loadingNext) {
      const timer = setTimeout(() => {
        setLoadingNext(false);
        scrollToBlock();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loadingNext]);

  const renderBlocks = () => {
    const blocks: JSX.Element[] = [];
    const totalBlocks = Math.ceil(localPosts.length / 5);
    const loadingBlockIndex = totalBlocks - 1;

    for (let i = 0; i < localPosts.length; i += 5) {
      const group = localPosts.slice(i, i + 5);
      const blockIndex = Math.floor(i / 5);
      const isLoadingBlock = loadingNext && blockIndex === loadingBlockIndex;

      blocks.push(
        <BlogBlock
          key={`block-${i}`}
          group={group}
          blockIndex={blockIndex}
          isLoadingBlock={isLoadingBlock}
          blockRef={blockRef}
        />
      );
    }

    return blocks;
  };

  return (
    <div className="max-w-content px-4 py-40 mx-auto">
      <div className="text-start mb-20 ">
        <p className="text-[24px] text-gray-400 font-medium mb-4">Our blog</p>
        <h2 className="text-[32px] md:text-[48px] leading-tight font-[500] text-[#0D0D0D]">
          This is where we tell stories.
          <br />
          Most of them are about design
        </h2>
      </div>

      <BlogFilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={() => {
          setPage(1);
          handleQuery(keyword, 1);
        }}
      />

      {postLoading && localPosts.length === 0 ? (
        <div className="space-y-10">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <BlogSkeleton span={2} />
              <BlogSkeleton />
            </div>
          ))}
        </div>
      ) : localPosts.length === 0 && postTotal === 0 ? (
        <div className="text-center text-gray-600 py-10">No results found.</div>
      ) : (
        <>
          {renderBlocks()}
          {localPosts.length < postTotal && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => {
                  setLoadingNext(true);
                  handleQuery(keyword, page + 1);
                }}
                className="px-6 py-3 bg-[#00A3FF] text-white rounded hover:bg-[#0088cc] transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  postList: state.posts.listPublic,
  postTotal: state.posts.totalPublic,
  postLoading: state.posts.loading,
});

const mapDispatchToProps = {
  fetchPublicPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
