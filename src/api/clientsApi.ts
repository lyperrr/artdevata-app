/** @format */

import { apiClient } from "./client";
import { RawClientData } from "@/types";

export async function fetchClientsApi(): Promise<RawClientData[] | { data: RawClientData[] } | { clients: RawClientData[] }> {
  return apiClient<RawClientData[] | { data: RawClientData[] } | { clients: RawClientData[] }>("/clients");
}
