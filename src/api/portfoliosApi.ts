/** @format */

import { apiClient } from "./client";
import { PortfolioItem } from "@/types";

export async function fetchPortfoliosApi(): Promise<PortfolioItem[] | { data: PortfolioItem[] }> {
  return apiClient<PortfolioItem[] | { data: PortfolioItem[] }>("/portfolios");
}

export async function fetchPortfolioByIdApi(id: string | number): Promise<PortfolioItem | { data: PortfolioItem }> {
  return apiClient<PortfolioItem | { data: PortfolioItem }>(`/portfolios/${id}`);
}
