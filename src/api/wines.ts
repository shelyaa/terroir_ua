import axios from "axios";
import qs from "qs";

import {Wine} from "../types/Wine";
import {FiltersQuery} from "../types/Filters";
import {API_BASE} from "../constants/apiConstant";

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
    `${API_BASE}/wines/search`,
    {
      params: filters,
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, {arrayFormat: "repeat"}),
      },
    }
  );

  return response.data;
};

export const getWinesItems = async (): Promise<PageResponse<Wine>> => {
  const response = await axios.get<PageResponse<Wine>>(
    `${API_BASE}/wines/items`
  );

  return response.data;
};

export const deleteWine = async (id: string, token: string | undefined) => {
  const response = await axios.delete(`${API_BASE}/wines/${id}`, {
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
  });
  return response.data;
};

export const getWineById = async (id: string): Promise<Wine> => {
  const response = await axios.get<Wine>(`${API_BASE}/wines/${id}`);

  return response.data;
};
