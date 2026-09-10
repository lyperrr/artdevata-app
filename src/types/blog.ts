/** @format */

export interface BlogPost {
  id: number | string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string | null;
  category?: string;
  author?: string;
  created_at: string;
  updated_at?: string;
  read_time?: string;
  tags?: string[];
}
