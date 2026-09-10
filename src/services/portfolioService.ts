/** @format */

import { fetchPortfoliosApi, fetchPortfolioByIdApi } from "@/api";
import { PortfolioItem } from "@/types";

function normalizePortfolio(item: any): PortfolioItem {
  return {
    ...item,
    id: item.id,
    title: item.title || "",
    description: item.description || "",
    image: item.image || "",
    link: item.link || null,
    category: item.category || "Umum",
    client: item.client || null,
    date: item.date || null,
    duration: item.duration || null,
    challenge: item.challenge || null,
    solution: item.solution || null,
    results: Array.isArray(item.results)
      ? item.results
      : typeof item.results === "string"
      ? item.results.split(",").map((s: string) => s.trim())
      : [],
    technologies: Array.isArray(item.technologies)
      ? item.technologies
      : typeof item.technologies === "string"
      ? item.technologies.split(",").map((s: string) => s.trim())
      : [],
    images: Array.isArray(item.images) ? item.images : [],
  };
}

export async function getPortfolios(): Promise<PortfolioItem[]> {
  try {
    const res = await fetchPortfoliosApi();
    const list = Array.isArray(res) ? res : res?.data || [];
    return list.map(normalizePortfolio);
  } catch (error) {
    console.error("Gagal memuat daftar portofolio:", error);
    return [];
  }
}

export async function getPortfolioById(
  id: string | number
): Promise<PortfolioItem | null> {
  try {
    const res = await fetchPortfolioByIdApi(id);
    const data = "data" in res && res.data ? res.data : (res as PortfolioItem);
    return normalizePortfolio(data);
  } catch (error) {
    console.error(`Gagal memuat portofolio #${id}:`, error);
    return null;
  }
}
