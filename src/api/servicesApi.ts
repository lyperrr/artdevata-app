/** @format */

import { apiClient } from "./client";
import { RawServiceData } from "@/types";

export async function fetchServicesApi(): Promise<RawServiceData[] | { data: RawServiceData[] }> {
  return apiClient<RawServiceData[] | { data: RawServiceData[] }>("/services");
}

export async function fetchServiceByIdApi(id: string | number): Promise<RawServiceData | { data: RawServiceData }> {
  return apiClient<RawServiceData | { data: RawServiceData }>(`/services/${id}`);
}
