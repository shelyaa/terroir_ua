import { useState } from "react";
import { getWines } from "../api/wines";
import { Filters, FiltersQuery } from "../types/Filters";
import { SelectableButton } from "./SelectableButton";

const typeOptions = [
  "Червоне",
  "Біле",
  "Рожеве",
  "Ігристе",
  "Десертне",
  "Портвейн",
  "Апельсинове",
];
const priceRanges = [
  { label: "До 200 грн", min: 0, max: 200 },
  { label: "200–400 грн", min: 200, max: 400 },
  { label: "400–600 грн", min: 400, max: 600 },
  { label: "600–1000 грн", min: 600, max: 1000 },
  { label: "Понад 1000 грн", min: 1000, max: null },
];
const yearOptions = [
  { label: "До 2015", min: null, max: 2014 },
  { label: "2015–2019", min: 2015, max: 2019 },
  { label: "2020", min: 2020, max: 2020 },
  { label: "2021", min: 2021, max: 2021 },
  { label: "2022", min: 2022, max: 2022 },
  { label: "2023", min: 2023, max: 2023 },
];
const producerOptions = [
  "Shabo",
  "Колоніст",
  "Biologist",
  "Beykush Winery",
  "Villa Tinta",
  "Frumushika-Nova",
  "46 Parallel Wine Group",
  "Don Alejandro Winery",
  "Father’s Wine",
  "SliVino Village",
];

export const Filtration = () => {
  const [filters, setFilters] = useState<Filters>({
    types: [],
    priceRanges: [],
    yearRanges: [],
    producers: [],
    name: "",
  });

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

  
    if (filters.priceRanges.length) {
      queryPayload.minPrice = Math.min(...filters.priceRanges.map((r) => r.min));
      const definedMax = filters.priceRanges
        .filter((r) => r.max !== null)
        .map((r) => r.max as number);
      if (definedMax.length > 0) {
        queryPayload.maxPrice = Math.max(...definedMax);
      }
    }
  
    if (filters.yearRanges.length) {
      const definedMin = filters.yearRanges
        .filter((r) => r.min !== null)
        .map((r) => r.min as number);
      const definedMax = filters.yearRanges
        .filter((r) => r.max !== null)
        .map((r) => r.max as number);
  
      if (definedMin.length > 0) {
        queryPayload.minYear = Math.min(...definedMin);
      }
  
      if (definedMax.length > 0) {
        queryPayload.maxYear = Math.max(...definedMax);
      }
    }
  
    const wines = await getWines(queryPayload);
    console.log("Результати пошуку:", wines);
  };
  

  return (
    <div>
      <h2 className="text-3xl font-semibold my-4 ml-1">Фільтри</h2>
      <div className="grid grid-cols-2 *:mb-10 *:w-[450px]">
        <div>
          <h3 className="text-2xl mb-6 font-medium ml-2">Тип вина</h3>

          <div className="flex flex-wrap gap-4 w-[480px]">
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
          <h3 className="text-2xl mb-6 font-medium ml-2">Ціна (грн)</h3>
          <div className="flex flex-wrap gap-3">
            {priceRanges.map(({ label, min, max }) => (
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
          <h3 className="text-2xl mb-6 font-medium ml-2">Рік урожаю</h3>
          <div className="flex flex-wrap gap-2">
            {yearOptions.map(({ label, min, max }) => (
              <SelectableButton
                key={label}
                label={label}
                selected={filters.yearRanges.some((p) => p.min === min && p.max == max)}
                onClick={() => toggleYearRange(min, max)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl mb-6 font-medium ml-2">
            Виноробня (виробник)
          </h3>
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
          <button className="px-30 py-3 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition font-semibold font-manrope text-sm" onClick={handleSearch}>
            Шукати →
          </button>
        </div>
      </div>
    </div>
  );
};
