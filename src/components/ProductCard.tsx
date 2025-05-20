import { Wine } from "../types/Wine";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type ProductCardProps = {
  wine: Wine;
};

export const ProductCard: React.FC<ProductCardProps> = ({ wine }) => {
  return (
    <Card className="font-manrope flex overflow-hidden flex-col group hover:bg-black hover:bg-opacity-100 relative">
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300 z-10" />

      <div className="flex justify-center ">
        <img
          src={wine.imagePath}
          alt={wine.name}
          className="max-h-64 object-contain"
        />

        <div className="absolute inset-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100  transition duration-300 z-20 text-white">
          <Link to='/favorites' className="hover:bg-white rounded-full p-2 transition hover:text-black">
            <FavoriteBorderOutlinedIcon />
          </Link>
          <Link to="/cart" className="hover:bg-white rounded-full p-2 transition hover:text-black">
            <ShoppingCartOutlinedIcon />
          </Link>

          <Link to='/details' className="hover:bg-white rounded-full p-2 transition hover:text-black">
            <ChevronRight />
          </Link>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-center">{wine.name}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 font-bold">
        <CardDescription>{wine.price} грн</CardDescription>

        <div className="flex items-center gap-2 justify-end">
          <CardDescription>{wine.rate}</CardDescription>
          <img src="src/assets/star.svg" alt="star" className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
};
