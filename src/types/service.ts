/** @format */

export interface ServiceItem {
  id: number | string;
  name: string;
  title?: string;
  description: string;
  price?: string | number | null;
  period?: string | null;
  features: string[];
  icon?: string | null;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RawServiceData {
  id: number | string;
  name?: string;
  title?: string;
  description: string;
  price?: string | number | null;
  period?: string | null;
  features?: string[] | string | null;
  icon?: string | null;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}
