/** @format */

import { apiClient } from "./client";
import { DocumentationItem } from "@/types";

export async function fetchDocumentationsApi(
  category?: string
): Promise<DocumentationItem[] | { data: DocumentationItem[] }> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiClient<DocumentationItem[] | { data: DocumentationItem[] }>(
    `/documentations${query}`
  );
}

export async function fetchDocumentationByIdApi(
  id: string | number
): Promise<DocumentationItem | { data: DocumentationItem }> {
  return apiClient<DocumentationItem | { data: DocumentationItem }>(
    `/documentations/${id}`
  );
}
