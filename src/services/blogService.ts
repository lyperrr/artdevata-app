/** @format */

import { fetchBlogsApi, fetchBlogByIdApi } from "@/api";
import { BlogPost } from "@/types";

function normalizeBlog(item: any): BlogPost {
  return {
    id: item.id,
    title: item.title || "",
    slug: item.slug || String(item.id),
    excerpt: item.excerpt || "",
    content: item.content || "",
    image: item.image || null,
    category: item.category || "Umum",
    author: item.author || "Tim ArtDevata",
    created_at: item.created_at || new Date().toISOString(),
    updated_at: item.updated_at,
    read_time: item.read_time || "5 Menit",
    tags: Array.isArray(item.tags)
      ? item.tags
      : typeof item.tags === "string"
      ? item.tags.split(",").map((t: string) => t.trim())
      : [],
  };
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetchBlogsApi();
    const list = Array.isArray(res) ? res : res?.data || [];
    return list
      .map(normalizeBlog)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  } catch (error) {
    console.error("Gagal memuat artikel blog:", error);
    return [];
  }
}

export async function getBlogById(
  id: string | number
): Promise<BlogPost | null> {
  try {
    const res = await fetchBlogByIdApi(id);
    const data = "data" in res && res.data ? res.data : (res as BlogPost);
    return normalizeBlog(data);
  } catch (error) {
    console.error(`Gagal memuat artikel blog #${id}:`, error);
    return null;
  }
}
