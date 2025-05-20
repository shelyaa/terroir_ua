import axios from "axios";
import { Wine } from "../types/Wine";

interface Filters {
  types?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  producers?: string;
  name?: string;
}

// export const getWines = async (filters: Filters): Promise<Wine[]> => {
//   const params = new URLSearchParams();

//   if (filters.types) params.append("types", filters.types);
//   if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
//   if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
//   if (filters.minYear) params.append("minYear", filters.minYear.toString());
//   if (filters.maxYear) params.append("maxYear", filters.maxYear.toString());
//   if (filters.producers) params.append("producers", filters.producers);
//   if (filters.name) params.append("name", filters.name);

//   const response = await axios.get<Wine[]>(`http://localhost:8080/wines/search?${params.toString()}`);
//   return response.data;
// };\
export const getWines = async (filters: Filters): Promise<Wine[]> => {
  const params = new URLSearchParams();

  if (filters.types) params.append("type", filters.types);
  if (filters.minPrice) params.append("price_gte", filters.minPrice.toString());
  if (filters.maxPrice) params.append("price_lte", filters.maxPrice.toString());
  if (filters.minYear) params.append("year_gte", filters.minYear.toString());
  if (filters.maxYear) params.append("year_lte", filters.maxYear.toString());
  if (filters.producers) params.append("producer", filters.producers);
  if (filters.name) params.append("name_like", filters.name);

  const response = await axios.get<Wine[]>(`http://localhost:8080/wines?${params.toString()}`);
  return response.data;
};
