import BlogDetail from "@/components/Client/Blog/BlogDetails";
import FormService from "@/components/Client/Common/FormService";
import { createMetadata, fetchPostMeta } from "@/utils/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPostMeta(params.slug);
  if (!post) {
    return createMetadata({
      title: "Page Not Found",
      description: "Post information not found.",
    });
  }

  return createMetadata({
    title: post.title,
    description: post.content,
    image: post.thumbnail,
    url: `https://kenphotos.com/blog/${params.slug}`,
  });
}

export default async function PostDetails({ params }: { params: { slug: string[] | string } }) {
  const slugPath = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const post = await fetchPostMeta(slugPath);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogDetail postDetail={post} />
      <FormService dataKey="formService" />
    </>
  );
}
