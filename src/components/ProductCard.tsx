import { Wine } from "../types/Wine";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type ProductCardProps = {
  wine: Wine;
  setIsSearchOpen: (isSearchOpen: boolean) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  wine,
  setIsSearchOpen,
}) => {
  const closeSearchBar = () => {
    setIsSearchOpen(false);
  };
  return (
    <Card className="font-manrope flex overflow-hidden flex-col group hover:bg-black hover:bg-opacity-100 relative">
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300 z-10" />

      <div className="flex justify-center ">
        <img
          src={wine.imageUrl}
          alt={wine.name}
          className="max-h-64 object-contain"
        />

        <div className="absolute inset-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100  transition duration-300 z-20 text-white font-semibold">
          <Link
            to="/cart"
            className="hover:bg-white rounded-full p-2 transition hover:text-[#521b1a]"
          >
            <ShoppingCartOutlinedIcon />
          </Link>

          <Link
            to={`/wine/${wine.id}`}
            className="hover:bg-white rounded-full p-2 transition hover:text-[#521b1a]"
            onClick={closeSearchBar}
          >
            <ChevronRight />
          </Link>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-center">{wine.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center items-center gap-25 ">
        <CardDescription>{wine.price} грн</CardDescription>

        <div className="flex items-center gap-2 justify-end">
          <CardDescription>{wine.rate}</CardDescription>
          <img src="src/assets/star.svg" alt="star" className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};
