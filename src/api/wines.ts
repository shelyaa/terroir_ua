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

export const getWines = async (filters: FiltersQuery): Promise<Wine[]> => {
  const response = await axios.get<PageResponse<Wine>>(
    "http://localhost:8080/wines/search",
    {
      params: filters,
      paramsSerializer: {
        serialize: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }), 
      },
    }
  );

  return response.data.content;
};
