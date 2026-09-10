/** @format */

export interface PortfolioItem {
  id: number | string;
  title: string;
  description: string;
  image: string;
  link: string | null;
  category: string | null;
  client?: string | null;
  date?: string | null;
  duration?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: string[];
  technologies?: string[];
  images?: string[];
}
