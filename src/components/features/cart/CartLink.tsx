import { Link } from "react-router-dom";
import { getIconClass } from "../../../utils/navigationStyles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";

interface CartLinkProps {
  isActive: (path: string) => boolean;
  itemCount?: number;
  onClick?: () => void;
}

export const CartLink: React.FC<CartLinkProps> = ({ isActive }) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((sum, item) => (sum += item.quantity), 0);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setVisible(false); 
      const timeout = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
    }
  }, [cartCount]);

  return (
    <Link
      to="/order"
      aria-label="Кошик"
      className={`relative ${getIconClass("/order", isActive)}`}
    >
      <ShoppingCartOutlinedIcon />
      {cartCount > 0 && (
        <span
          className={`font-manrope absolute top-6 left-6 w-5 h-5 bg-bordo text-white text-[10px] rounded-full flex items-center justify-center 
            transition-all duration-700 ease-out 
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-10"}`}
        >
          {cartCount}
        </span>
      )}
    </Link>
  );
};
