import React from "react";
import { SquareCheck } from "lucide-react";

type FiltersQuery = {
  page?: number;
  types?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  producers?: string[];
};

function getFiltersArray(params: FiltersQuery): React.ReactNode[] {
  const filters: React.ReactNode[] = [];

  if (params.types && params.types.length) {
    filters.push(
      <span key="types" className="">
        {params.types.join(", ")}
      </span>
    );
  }

  if (params.minPrice || params.maxPrice) {
    let price = "";
    if (params.minPrice && params.maxPrice)
      price = `${params.minPrice}–${params.maxPrice} грн`;
    else if (params.minPrice) price = `від ${params.minPrice} грн`;
    else if (params.maxPrice) price = `до ${params.maxPrice} грн`;
    if (price)
      filters.push(
        <span key="price" className="">
          {price}
        </span>
      );
  }

  if (params.minYear || params.maxYear) {
    let year = "";
    if (params.minYear && params.maxYear)
      year = `${params.minYear}–${params.maxYear}`;
    else if (params.minYear) year = `від ${params.minYear}`;
    else if (params.maxYear) year = `до ${params.maxYear}`;
    if (year)
      filters.push(
        <span key="year" className="">
          {year}
        </span>
      );
  }

  if (params.producers && params.producers.length) {
    params.producers.forEach((producer) => {
      filters.push(
        <span
          key={`producer-${producer}`}
          className="flex items-center gap-1"
        >
          <SquareCheck size={20} />
          {producer}
        </span>
      );
    });
  }

  return filters;
}

// Основний компонент
export const AppliedFilters: React.FC<{
  filters: FiltersQuery;
  onClear?: () => void;
}> = ({ filters }) => {
  const hasFilters =
    (filters.types && filters.types.length > 0) ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minYear ||
    filters.maxYear ||
    (filters.producers && filters.producers.length > 0);

  if (!hasFilters) return null;

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-2">
        <span className="text-3xl font-semibold">Застосовані фільтри:</span>
      </div>
      <div className="flex flex-wrap items-center gap-6 font-manrope text-sm font-medium">
        {getFiltersArray(filters)}
      </div>
    </div>
  );
};
