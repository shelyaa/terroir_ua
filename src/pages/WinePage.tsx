import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import { ProductCard } from "../components/ProductCard";
import { Wine } from "../types/Wine";
import { getWines } from "../api/wines";
import { SlidersHorizontal } from "lucide-react";
import { Filtration } from "../components/Filtration";

export const WinePage = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Усі");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getWines({ type: selectedType });
      setWines(result);
    };

    fetchData();
  }, [selectedType]);

  return (
    <div className="py-2 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-center relative min-h-10">
       {!isFilterOpen && <h1 className="text-3xl font-semibold text-center">Наші вина</h1>}

        <div className="absolute right-4 mr-15 mt-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="hover:bg-gray-100"
          >
            <SlidersHorizontal className="cursor-pointer text-gray-700" />
          </button>
        </div>
      </div>
      <div className="w-full">{isFilterOpen && <Filtration />}</div>

      <div className=" px-4 ">
        <div className="justify-center flex mb-4">
          <FilterBar
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
          {wines.map((wine) => (
            <ProductCard key={wine.name} wine={wine} />
          ))}
        </div>
      </div>
    </div>
  );
};
