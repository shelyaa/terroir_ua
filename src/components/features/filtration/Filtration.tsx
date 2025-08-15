import { useEffect, useState } from "react";
import {
  priceRangesOptions,
  producerOptions,
  typeOptions,
  yearOptions,
} from "../../../constants/filterOptions";
import { Filters, FiltersQuery } from "../../../types/Filters";
import { SelectableButton } from "../../ui/SelectableButton";

type FiltrationProps = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
  setIsFilterOpen: (isFiltetOpen: boolean) => void;
};

export const Filtration = ({
  searchParams,
  setSearchParams,
  setIsFilterOpen,
}: FiltrationProps) => {
  const [filters, setFilters] = useState<Filters>({
    types: [],
    priceRanges: [],
    yearRanges: [],
    producers: [],
    name: "",
  });

  function findMatchingOptions(
    min: number,
    max: number,
    options: { min: number; max: number | null }[]
  ) {
    return options.filter(
      (opt) => opt.min >= min && (opt.max ?? Infinity) <= max
    );
  }

  useEffect(() => {
    const types = searchParams.get("type")?.split(",").filter(Boolean) ?? [];
    const producers =
      searchParams.get("producer")?.split(",").filter(Boolean) ?? [];

    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;
    const priceRanges =
      minPrice !== undefined && maxPrice !== undefined
        ? findMatchingOptions(minPrice, maxPrice, priceRangesOptions)
        : [];

    const minYear = searchParams.get("minYear")
      ? Number(searchParams.get("minYear"))
      : undefined;
    const maxYear = searchParams.get("maxYear")
      ? Number(searchParams.get("maxYear"))
      : undefined;
    const yearRanges =
      minYear !== undefined && maxYear !== undefined
        ? findMatchingOptions(minYear, maxYear, yearOptions)
        : [];

    const name = searchParams.get("name") ?? "";
    setFilters({ types, priceRanges, yearRanges, producers, name });
  }, [searchParams]);

  const buildFiltersQuery = (filters: Filters): FiltersQuery => {
    return {
      types: filters.types.length ? filters.types : undefined,
      minPrice: filters.priceRanges.length
        ? Math.min(...filters.priceRanges.map((r) => r.min))
        : undefined,
      maxPrice: filters.priceRanges.length
        ? Math.max(
            ...filters.priceRanges
              .filter((r) => r.max !== null)
              .map((r) => r.max ?? 0)
          )
        : undefined,
      minYear: filters.yearRanges.length
        ? Math.min(...filters.yearRanges.map((r) => r.min ?? 0))
        : undefined,
      maxYear: filters.yearRanges.length
        ? Math.max(
            ...filters.yearRanges.map((r) => r.max ?? new Date().getFullYear())
          )
        : undefined,
      producers: filters.producers.length ? filters.producers : undefined,
      name: filters.name.trim() || undefined,
    };
  };

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const togglePriceRange = (min: number, max: number | null) => {
    setFilters((prev) => {
      const exists = prev.priceRanges.some(
        (range) => range.min === min && range.max === max
      );
      return {
        ...prev,
        priceRanges: exists
          ? prev.priceRanges.filter(
              (range) => !(range.min === min && range.max === max)
            )
          : [...prev.priceRanges, { min, max }],
      };
    });
  };

  const toggleYearRange = (min: number | null, max: number | null) => {
    setFilters((prev) => {
      const exists = prev.yearRanges.some(
        (range) => range.min === min && range.max === max
      );
      return {
        ...prev,
        yearRanges: exists
          ? prev.yearRanges.filter(
              (range) => !(range.min === min && range.max === max)
            )
          : [...prev.yearRanges, { min, max }],
      };
    });
  };

  const toggleProducer = (producer: string) => {
    setFilters((prev) => ({
      ...prev,
      producers: prev.producers.includes(producer)
        ? prev.producers.filter((p) => p !== producer)
        : [...prev.producers, producer],
    }));
  };

  const handleSearch = async () => {
    const queryPayload = buildFiltersQuery(filters);

    const params: Record<string, string> = {};
    if (queryPayload.types) params.type = queryPayload.types.join(",");
    if (queryPayload.minPrice !== undefined)
      params.minPrice = queryPayload.minPrice.toString();
    if (queryPayload.maxPrice !== undefined)
      params.maxPrice = queryPayload.maxPrice.toString();
    if (queryPayload.minYear !== undefined)
      params.minYear = queryPayload.minYear.toString();
    if (queryPayload.maxYear !== undefined)
      params.maxYear = queryPayload.maxYear.toString();
    if (queryPayload.producers)
      params.producer = queryPayload.producers.join(",");
    if (queryPayload.name) params.name = queryPayload.name;

    setSearchParams(new URLSearchParams(params));
    console.log(params);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      priceRanges: [],
      yearRanges: [],
      producers: [],
      name: "",
    });
  };

  const clearTypes = () => {
    setFilters((prev) => ({
      ...prev,
      types: [],
    }));
  };
  const clearPriceRanges = () => {
    setFilters((prev) => ({
      ...prev,
      priceRanges: [],
    }));
  };
  const clearYearRanges = () => {
    setFilters((prev) => ({
      ...prev,
      yearRanges: [],
    }));
  };
  const clearProducers = () => {
    setFilters((prev) => ({
      ...prev,
      producers: [],
    }));
  };

  return (
    <div className="mx-4">
      <div className="my-4 ml-1 flex gap-4 items-baseline">
        <h2 className="text-3xl font-semibold ">Фільтри</h2>
        <button
          className="font-manrope text-sm text-light-gray font-medium cursor-pointer"
          onClick={clearFilters}
        >
          Очистити всі фільтри
        </button>
      </div>

      <div className="grid md:grid-cols-2 *:mb-10 *:max-w-[450px] grid-cols-1">
        <div>
          <div className="flex gap-4 items-baseline">
            <h3 className="text-2xl mb-6 font-medium ml-2">Тип вина</h3>
            <button
              className="font-manrope text-sm text-light-gray font-medium pt-1 cursor-pointer"
              onClick={clearTypes}
            >
              Очистити
            </button>
          </div>

          <div className="flex flex-wrap gap-4 max-w-[480px]">
            {typeOptions.map((type) => (
              <SelectableButton
                key={type}
                label={type}
                selected={filters.types.includes(type)}
                onClick={() => toggleType(type)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex gap-4 items-baseline">
            <h3 className="text-2xl mb-6 font-medium ml-2">Ціна</h3>
            <button
              className="font-manrope text-sm text-light-gray font-medium pt-1 cursor-pointer"
              onClick={clearPriceRanges}
            >
              Очистити
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {priceRangesOptions.map(({ label, min, max }) => (
              <SelectableButton
                key={label}
                label={label}
                selected={filters.priceRanges.some(
                  (p) => p.min === min && p.max === max
                )}
                onClick={() => togglePriceRange(min, max)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex gap-4 items-baseline">
            <h3 className="text-2xl mb-6 font-medium ml-2">Рік урожаю</h3>
            <button
              className="font-manrope text-sm text-light-gray font-medium pt-1 cursor-pointer"
              onClick={clearYearRanges}
            >
              Очистити
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {yearOptions.map(({ label, min, max }) => (
              <SelectableButton
                key={label}
                label={label}
                selected={filters.yearRanges.some(
                  (p) => p.min === min && p.max == max
                )}
                onClick={() => toggleYearRange(min, max)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex gap-4 items-baseline">
            <h3 className="text-2xl mb-6 font-medium ml-2">
              Виноробня (виробник)
            </h3>
            <button
              className="font-manrope text-sm text-light-gray font-medium pt-1 cursor-pointer"
              onClick={clearProducers}
            >
              Очистити
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 max-w-md font-manrope text-sm font-medium">
            {producerOptions.map((producer) => (
              <label key={producer} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.producers.includes(producer)}
                  onChange={() => toggleProducer(producer)}
                  className="accent-black"
                />
                {producer}
              </label>
            ))}
          </div>
        </div>

        <div>
          <button
            className="px-30 py-3 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition font-semibold font-manrope text-sm"
            onClick={handleSearch}
          >
            Шукати →
          </button>
        </div>
      </div>
    </div>
  );
};
