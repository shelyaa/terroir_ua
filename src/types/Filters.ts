export interface Filters {
  types: string[];
  priceRanges: { min: number; max: number | null }[];
  yearRanges: { min: number | null; max: number | null }[];
  producers: string[];
  name: string;
}

export interface FiltersQuery {
  types?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  producers?: string[];
  name?: string;
}