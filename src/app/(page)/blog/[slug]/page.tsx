import BlogDetail from "@/components/Client/Blog/BlogDetails";
import FormService from "@/components/Client/Common/FormService";
import { createMetadata, fetchPostMeta, stripHtml } from "@/utils/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPostMeta(params.slug);
  if (!post) {
    return createMetadata({
      title: "Page Not Found",
      description: "Post information not found.",
    });
  }

  const plainText = stripHtml(post.content);
  const shortDescription = plainText.length > 160 ? plainText.slice(0, 157) + "..." : plainText;

  return createMetadata({
    title: post.title,
    description: shortDescription,
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
