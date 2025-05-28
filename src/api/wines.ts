import axios from "axios";
import { Wine } from "../types/Wine";
import { FiltersQuery } from "../types/Filters";

export const getWines = async (filters: FiltersQuery): Promise<Wine[]> => {
  const params = new URLSearchParams();

  filters.types?.forEach((type) => params.append("types", type));
  if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
  if (filters.minYear) params.append("minYear", filters.minYear.toString());
  if (filters.maxYear) params.append("maxYear", filters.maxYear.toString());
  filters.producers?.forEach((p) => params.append("producers", p));
  if (filters.name) params.append("name", filters.name);

  const response = await axios.get(`http://localhost:8080/wines/search?${params.toString()}`);
  return response.data.content;
};