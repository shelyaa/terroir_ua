import { FC, useEffect, useState } from "react";
import { Input } from "../../ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { X } from "lucide-react";
import { Wine } from "../../../types/Wine";
import { ProductCard } from "../wine/ProductCard";
import { API_BASE } from "../../../constants/apiConstant";

type Props = {
  setIsSearchOpen: (isSearchOpen: boolean) => void;
};

export const SearchBar: FC<Props> = ({ setIsSearchOpen }) => {
  const [products, setProducts] = useState<Wine[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);

  // Отримання вин з бекенду
  useEffect(() => {
    fetch(`${API_BASE}/wines`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.content);
        setFiltered([data.content]); // Початково показуємо всі вина
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка при отриманні даних:", error);
        setLoading(false);
      });
  }, []);

  // Пошук по всіх полях вина
  function searchInWine(wine: Wine, query: string) {
    if (!query.trim()) return true;
    const values = Object.values(wine)
      .filter((v) => typeof v === "string" || typeof v === "number")
      .map((v) => String(v).toLowerCase())
      .join(" ");
    return values.includes(query.trim().toLowerCase());
  }

  // Оновлення фільтрованого списку при зміні пошуку
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(products);
    } else {
      setFiltered(products.filter((wine) => searchInWine(wine, search)));
    }
  }, [search, products]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    setFiltered(products.filter((wine) => searchInWine(wine, search)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="bg-[#F3F3F3] border-1 border-gray-200 px-10 py-4">
      <div className="mb-4 w-full font-manrope flex justify-between items-center gap-4">
        <div className="w-full max-w-6xl">
          <Input
            placeholder="Введіть назву вина"
            className="w-full"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="pt-3 rounded gap-15 flex mr-10 *:cursor-pointer">
          <button
            onClick={handleSearchClick}
            className="hover:bg-gray-200 cursor-pointer"
          >
            <SearchIcon />
          </button>
          <button
            className="hover:bg-gray-200 cursor-pointer"
            onClick={() => setIsSearchOpen(false)}
          >
            <X strokeWidth={1.8} />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-gray-500 py-8">Завантаження...</div>
      ) : (
        <div>
          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-8 text-xl">
              Нічого не знайдено
            </div>
          )}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4">
            {filtered.slice(0, 4).map((product) => (
              <ProductCard wine={product} key={product.id} setIsSearchOpen={setIsSearchOpen}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};