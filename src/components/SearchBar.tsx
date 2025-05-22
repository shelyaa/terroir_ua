import { useState } from "react";
import { Input } from "./ui/input";
import { SlidersHorizontal } from "lucide-react";
import { Filtration } from "./Filtration";
import { X } from "lucide-react";

export const SearchBar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg border-t border-gray-200 px-10 py-4">
      <div className="mb-4 w-full font-manrope flex justify-between items-center gap-4">
        <div className="w-full max-w-4xl">
          <Input placeholder="Введіть назву вина" className="w-full" />
        </div>
        <div className="pt-3 rounded  gap-20 flex">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="hover:bg-gray-100"
          >
            <SlidersHorizontal className="cursor-pointer text-gray-700" />
          </button>
          <button className="  hover:bg-gray-100">
            <X strokeWidth={1.7}  />
          </button>
        </div>
      </div>

      {isFilterOpen && <Filtration />}
    </div>
  );
};
