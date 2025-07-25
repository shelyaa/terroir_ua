import { FiltersQuery } from "../types/Filters";


export function hasAppliedFilters(params: FiltersQuery): boolean {
  if (params.types && params.types.length > 1) return true;
  if ((params.types && params.types.length === 1) &&
      (!params.minPrice && !params.maxPrice && !params.minYear && !params.maxYear && !params.producers)
  ) return false;

  return Boolean(
    (params.types && params.types.length > 0) ||
    params.minPrice ||
    params.maxPrice ||
    params.minYear ||
    params.maxYear ||
    (params.producers && params.producers.length > 0)
  );
}