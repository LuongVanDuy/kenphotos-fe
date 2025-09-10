"use client";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPublicPosts } from "@/store/actions/posts";

import MainTitle from "@/components/Client/Common/Title/MainTitle";
import BlogCard from "@/components/Client/Blog/BlogCard";
import BlogCardLoading from "@/components/Client/Blog/BlogCardLoading";
import BlogFilterBar from "@/components/Client/Blog/BlogFilterBar";
import { Empty } from "antd";
import { motion } from "framer-motion";

const BlogList = ({
  fetchPublicPosts,
  postList,
  postTotal,
  postLoading,
}: any) => {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [grids, setGrids] = useState<any[][]>([]);

  function handleQuery(
    search = "",
    page = 1,
    itemsPerPage = 12,
    reset = false
  ) {
    if (reset) setGrids([]);
    fetchPublicPosts({
      search,
      page,
      itemsPerPage,
      sortBy: "createdTime",
      sortDesc: true,
    });
    setPageNumber(page);
    setPageSize(itemsPerPage);
  }

  useEffect(() => {
    if (postList && postList.length > 0) {
      setGrids((prev) => [...prev, postList]);
    }
  }, [postList]);

  useEffect(() => {
    handleQuery(search, 1, pageSize);
  }, []);

  return (
    <>
      <section className="pb-10 pt-24 md:pt-[180px]">
        <div className="max-w-content px-4 mx-auto">
          <div className="max-w-2xl mb-8">
            <MainTitle
              title={
                <>
                  True Color Blog
                  <br />
                  Real Estate{" "}
                  <span className="inline-block bg-gradient-to-r from-[#2D6DFF] to-[#3BE5FF] bg-clip-text text-transparent -webkit-background-clip-text -webkit-text-fill-transparent">
                    Photo Tips
                  </span>
                </>
              }
              content="Discover expert advice, creative ideas, and the latest techniques to make your real estate photos stand out in any market."
              align="left"
            />
          </div>

          <BlogFilterBar
            keyword={search}
            onKeywordChange={(value) => setSearch(value)}
            onSearch={() => handleQuery(search, 1, pageSize, true)}
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-10 mt-12"
          >
            {postLoading && grids.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 styles_postList">
                {Array.from({ length: 5 }).map((_, index) => (
                  <BlogCardLoading key={index} />
                ))}
              </div>
            )}

            {grids.map((grid, gridIndex) => (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
                  },
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                key={gridIndex}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 styles_postList ${
                  (gridIndex + 1) % 2 === 0 ? "styles_postList_old" : ""
                }`}
              >
                {grid.map((post: any, index: any) => (
                  <BlogCard key={index} blog={post} />
                ))}
              </motion.div>
            ))}
          </motion.div>

          {grids.flat().length < postTotal && (
            <div className="text-center mt-10">
              <button
                onClick={() => handleQuery(search, pageNumber + 1, pageSize)}
                className="px-[30px] py-[15px] text-[16px] bg-[#2D6DFF] text-white rounded-full text-sm font-medium hover:opacity-90 transition-all"
              >
                {postLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {!postLoading && grids.length === 0 && (
            <div className="w-full flex justify-center py-16">
              <Empty description="No posts found" />
            </div>
          )}
        </div>
      </section>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
