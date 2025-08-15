import BlogList from "@/components/Client/Blog/BlogList";
import FormService from "@/components/Client/Common/FormService";
import { createMetadata } from "@/utils/metadata";

export async function generateMetadata() {
  return createMetadata({
    title: "Blog",
    description: "Explore the latest articles and insights from KenPhotos.",
  });
}

const Blog = () => {
  return (
    <>
      <BlogList />
      <FormService dataKey="formService" />
    </>
  );
};

export default Blog;
