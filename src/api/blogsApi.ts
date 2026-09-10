/** @format */

import { apiClient } from "./client";
import { BlogPost } from "@/types";

export async function fetchBlogsApi(): Promise<BlogPost[] | { data: BlogPost[] }> {
  return apiClient<BlogPost[] | { data: BlogPost[] }>("/blogs");
}

export async function fetchBlogByIdApi(id: string | number): Promise<BlogPost | { data: BlogPost }> {
  return apiClient<BlogPost | { data: BlogPost }>(`/blogs/${id}`);
}
