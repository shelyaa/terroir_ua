import axios from "axios";
import qs from "qs";

import { Wine } from "../types/Wine";
import { FiltersQuery } from "../types/Filters";

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export const getWines = async (
  filters?: FiltersQuery
): Promise<PageResponse<Wine>> => {
  const response = await axios.get<PageResponse<Wine>>(
    "http://localhost:8080/wines/search",
    {
      params: filters,
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
      },
    }
  );

  return response.data;
};

export const getWinesItems = async (): Promise<PageResponse<Wine>> => {
  const response = await axios.get<PageResponse<Wine>>(
    "http://localhost:8080/wines/items"
  );

  return response.data;
};
export const deleteWine = async (id: string, token: string | undefined) => {
  const response = await axios.delete(`http://localhost:8080/wines/${id}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return response.data;
};
