import rss from "@astrojs/rss";
import { fetchAllBlogPosts } from "@/data/sanity/fetch";

export async function GET(context) {
  const posts = await fetchAllBlogPosts();

  return rss({
    title: "Trey Willetto Blog",
    description: "Posts on projects, code, and ideas.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug}`,
    })),
  });
}
