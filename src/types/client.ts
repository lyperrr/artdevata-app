/** @format */

export interface ClientItem {
  id: number | string;
  name: string;
  company?: string;
  logo: string;
}

export interface RawClientData {
  id?: number | string;
  _id?: number | string;
  name?: string;
  title?: string;
  company?: string;
  logo?: string;
  image?: string;
  logo_url?: string;
  logoUrl?: string;
}
