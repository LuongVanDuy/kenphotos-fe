import { Card, Skeleton } from "antd";

const BlogCardLoading = () => {
  return (
    <div className="flex flex-col">
      <div>
        <div className="card-image w-full h-[360px] xl:h-[440px] overflow-hidden rounded-xl border border-gray-100 relative">
          <Skeleton.Image active style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <div>
        <h3 className="mt-3 text-xl font-semibold hover:text-[#00A3FF] cursor-pointer transition">
          <Skeleton active title={false} paragraph={{ rows: 2, width: "60%" }} />
        </h3>
      </div>
    </div>
  );
};

export default BlogCardLoading;
