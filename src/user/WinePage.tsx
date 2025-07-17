import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import { ProductCard } from "../components/ProductCard";
import { Wine } from "../types/Wine";
import { getWines } from "../api/wines";
import { AlignLeft } from "lucide-react";
import { Filtration } from "../components/Filtration";
import { useSearchParams } from "react-router-dom";
import { FiltersQuery } from "../types/Filters";
import { Loading } from "../components/ui/loading";
import PaginationRounded from "../components/Pagination";
import { ProductSlider } from "../components/ProductsSlider";

export const WinePage = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Усі");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Допоміжна функція для формування параметрів фільтрації
  const getQueryParams = (): FiltersQuery => {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setWines([]);
      try {
        // (опційно) штучна затримка для демо-ефекту лоадера
        await new Promise((resolve) => setTimeout(resolve, 300));
        const result = await getWines(getQueryParams());
        setWines(result.content);
        setTotalPages(result.totalPages);
      } catch (e) {
        console.error("Помилка при отриманні вин:", e);
        setWines([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchParams, selectedType, page]);

  const handleSelectType = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "Усі") {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    setPage(0); // Скидаємо сторінку на 0 при зміні типу
    setSearchParams(params);
    setSelectedType(type);
  };

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
          <div className="justify-center flex mb-4">
            <FilterBar
              selectedType={selectedType}
              onSelectType={handleSelectType}
            />
          </div>
        )}

        {searchParams && (
          <div>
            <h2 className="text-3xl font-semibold">Застосовані фільтри: {searchParams}</h2>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loading />
          </div>
        ) : !isFilterOpen && wines.length === 0 ? (
          <div className="text-center text-2xl font-semibold mt-8">
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
      {wines.length !== 0 && (
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
        <ProductSlider />
      </div>
    </div>
  );
};
