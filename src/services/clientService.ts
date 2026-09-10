/** @format */

import { fetchClientsApi } from "@/api";
import { ClientItem, RawClientData } from "@/types";

export async function getClients(): Promise<ClientItem[]> {
  try {
    const res = await fetchClientsApi();
    let list: RawClientData[] = [];

    if (Array.isArray(res)) {
      list = res;
    } else if ("data" in res && Array.isArray(res.data)) {
      list = res.data;
    } else if ("clients" in res && Array.isArray(res.clients)) {
      list = res.clients;
    }

    return list
      .map((it) => ({
        id: it.id ?? it._id ?? Math.random().toString(),
        name: it.name ?? it.title ?? it.company ?? "",
        company: it.company ?? it.name ?? "",
        logo: it.logo ?? it.image ?? it.logo_url ?? it.logoUrl ?? "",
      }))
      .filter((it) => typeof it.logo === "string" && it.logo.trim().length > 0);
  } catch (error) {
    console.error("Gagal memuat data klien:", error);
    return [];
  }
}
