/** @format */

import {
  fetchDocumentationsApi,
  fetchDocumentationByIdApi,
} from "@/api";
import { DocumentationItem } from "@/types";

function normalizeDocumentation(item: any): DocumentationItem {
  return {
    id: item.id,
    title: item.title || "",
    description: item.description || "",
    imageUrl: item.image || item.image_url || "",
    image: item.image || item.image_url || "",
    category: item.category || "Dokumentasi",
    sort_order: item.sort_order ?? 0,
    created_at: item.created_at,
    updated_at: item.updated_at,
  };
}

export async function getDocumentations(
  category?: string
): Promise<DocumentationItem[]> {
  try {
    const res = await fetchDocumentationsApi(category);
    const list = Array.isArray(res) ? res : res?.data || [];
    return list.map(normalizeDocumentation);
  } catch (error) {
    console.error("Gagal memuat data dokumentasi:", error);
    return [];
  }
}

export async function getDocumentationById(
  id: string | number
): Promise<DocumentationItem | null> {
  try {
    const res = await fetchDocumentationByIdApi(id);
    const data =
      "data" in res && res.data ? res.data : (res as DocumentationItem);
    return normalizeDocumentation(data);
  } catch (error) {
    console.error(`Gagal memuat dokumentasi #${id}:`, error);
    return null;
  }
}
