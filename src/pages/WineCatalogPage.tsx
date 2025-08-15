import { useEffect, useState, useCallback } from "react";
import { FilterBar } from "../components/features/filtration/FilterBar";
import { Wine } from "../types/Wine";
import { getWines } from "../api/wines";
import { AlignLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { FiltersQuery } from "../types/Filters";
import PaginationRounded from "../components/ui/Pagination";
import { WineSlider } from "../components/features/wine/WineSlider";
import { hasAppliedFilters } from "../utils/hasAppliedFilters";
import { AppliedFilters } from "../utils/getAppliedFiltersText";
import { SkeletonCard } from "../components/ui/SkeletonCard";
import { Filtration } from "../components/features/filtration/Filtration";
import { ProductCard } from "../components/features/wine/ProductCard";

export const WineCatalogPage = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Формування параметрів фільтрації
  const getQueryParams = useCallback((): FiltersQuery => {
    const params: FiltersQuery = { page };
    const getArr = (key: string): string[] | undefined =>
      searchParams.get(key)?.split(",") ?? undefined;
    if (searchParams.get("type")) params.types = getArr("type");
    if (searchParams.get("minPrice"))
      params.minPrice = Number(searchParams.get("minPrice"));
    if (searchParams.get("maxPrice"))
      params.maxPrice = Number(searchParams.get("maxPrice"));
    if (searchParams.get("minYear"))
      params.minYear = Number(searchParams.get("minYear"));
    if (searchParams.get("maxYear"))
      params.maxYear = Number(searchParams.get("maxYear"));
    if (searchParams.get("producer")) params.producers = getArr("producer");
    return params;
  }, [searchParams, page]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      getWines(getQueryParams()),
      new Promise((resolve) => setTimeout(resolve, 500)),
    ])
      .then(([result]) => {
        if (!isMounted) return;
        setWines(result.content);
        setTotalPages(result.totalPages);
      })
      .catch((e) => {
        if (!isMounted) return;
        console.error("Помилка при отриманні вин:", e);
        setTotalPages(0);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [getQueryParams]);

  // Вибір типу вина через фільтр
  const handleSelectType = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "Усі") {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    setPage(0);
    setSearchParams(params);
  };

  // Визначення, чи показувати FilterBar
  const shouldShowFilterBar = (
    searchParams: URLSearchParams,
    isFilterOpen: boolean
  ): boolean => {
    if (isFilterOpen) return false;
    const typeParam = searchParams.get("type");
    const onlyTypeParam = searchParams.size === 1 && typeParam;
    const singleType = onlyTypeParam && !typeParam.includes(",");
    const noParams = searchParams.toString() === "";
    return noParams || singleType;
  };

  const queryParams = getQueryParams();

  return (
    <div className="py-3 max-w-7xl mx-auto">
      <div className="flex relative min-h-15">
        {shouldShowFilterBar(searchParams, isFilterOpen) && (
          <h1 className="absolute left-1/2 top-0 -translate-x-1/2 text-3xl font-semibold text-center w-full mb-8 pointer-events-none">
            Наші вина
          </h1>
        )}

        {isFilterOpen && (
          <Filtration
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setIsFilterOpen={setIsFilterOpen}
          />
        )}

        <div className="absolute right-1 mt-2">
          <button
            onClick={() => setIsFilterOpen((open) => !open)}
            className="hover:bg-gray-100"
            aria-label="Відкрити/закрити фільтр"
          >
            <AlignLeft className="cursor-pointer text-gray-700" />
          </button>
        </div>
      </div>

      <div className="px-4">
        {shouldShowFilterBar(searchParams, isFilterOpen) && (
          <div className="mb-4">
            <FilterBar
              searchParams={searchParams}
              onSelectType={handleSelectType}
            />
          </div>
        )}

        {!isFilterOpen && hasAppliedFilters(queryParams) && (
          <AppliedFilters filters={queryParams} />
        )}

        <div className="">
          <div className="">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 20 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : !isFilterOpen && wines.length === 0 ? (
              <div className="text-center text-2xl font-semibold md:p-40 p-10">
                Товарів не знайдено
              </div>
            ) : (
              !isFilterOpen && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
                  {wines.map((wine) => (
                    <ProductCard key={wine.id} wine={wine} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {wines.length !== 0 && !isFilterOpen && (
        <div className="mt-8 flex justify-center">
          <PaginationRounded
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      )}
      <div className="my-12">
        <h1 className="text-[#250001] text-center text-3xl font-semibold mb-10">
          Пропозиції місяця
        </h1>
        <WineSlider />
        
      </div>
    </div>
  );
};
