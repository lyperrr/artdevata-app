/** @format */

export interface DocumentationItem {
  id: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  image?: string;
  category?: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export type GalleryItem = DocumentationItem;
