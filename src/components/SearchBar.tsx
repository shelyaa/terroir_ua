import { FC, useState } from "react";
import { Input } from "./ui/input";
import { SlidersHorizontal } from "lucide-react";
import { Filtration } from "./Filtration";
import { X } from "lucide-react";
type Props = {
  setIsSearchOpen: (isSearchOpen: boolean) => void;
}

export const SearchBar: FC<Props> = ({setIsSearchOpen}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-[#F3F3F3] border-1 border-gray-200 px-10 py-4">
      <div className="mb-4 w-full font-manrope flex justify-between items-center gap-4">
        <div className="w-full max-w-4xl">
          <Input placeholder="Введіть назву вина" className="w-full" />
        </div>
        <div className="pt-3 rounded gap-15 flex mr-10 *:cursor-pointer">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="hover:bg-gray-200"
          >
            <SlidersHorizontal />
          </button>
          <button
            className="hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsSearchOpen(false)}>
            <X strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {isFilterOpen && <Filtration />}
    </div>
  );
};
