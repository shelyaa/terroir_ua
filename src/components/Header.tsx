import { FC } from "react";
import logo from "/logo/logo.png";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

type HeaderProps = {
  isSearchOpen: boolean;
  onOpenSearch: (isSearchOpen: boolean) => void;
};

const Header: FC<HeaderProps> = ({onOpenSearch, isSearchOpen}) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const getIconClass = (path: string) =>
    `p-2 rounded-full transition duration-200  w-10 h-10 flex items-center justify-center hover:text-black ${
      isActive(path)
        ? "border-1 border-[#590004] text-[#590004] bg-white"
        : "text-[#5A5A5A]"
    }`;

  const getPageClass = (path: string) =>
    `pb-1 inline-flex items-center justify-center w-25 hover:text-black border-b-1 border-[#F3F3F3] ${
      isActive(path) ? "border-gray" : ""
    }`;

  return (
    <header className="border-b-1 border-[#FCBA04] bg-[#F3F3F3] relative mb-1">
      <div className="container mx-15 flex h-[70px] items-center justify-between px-4">
        <div className="flex items-center gap-12">
          <Link to="/" className="block h-[65px] w-[65px]">
            <span className="sr-only">Home</span>
            <img
              src={logo}
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-5 text-xl text-[#5A5A5A] font-medium">
              <li>
                <Link to="/wine" className={`${getPageClass("/wine")}`}>
                  Вина
                </Link>
              </li>
              <li>
                <Link className={`${getPageClass("/winery")}`} to="/winery">
                  Виноробні
                </Link>
              </li>
              <li>
                <Link className={`${getPageClass("/about-us")}`} to="/about-us">
                  Про нас
                </Link>
              </li>
              <li>
                <Link className={`${getPageClass("/contacts")}`} to="/contacts">
                  Контакти
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6 text-[#5A5A5A]">
          <button
             onClick={() => onOpenSearch(!isSearchOpen)}
            aria-label="Пошук"
            className={` p-2 rounded-full transition duration-200  w-10 h-10 flex items-center justify-center hover:text-black ${isSearchOpen ? "border-1 border-[#590004] text-[#590004] bg-white" : ""} `}
          >
            <SearchIcon />
          </button>
          <Link
            to="/auth"
            aria-label="Акаунт"
            className={`${getIconClass("/auth")} ${getIconClass("/register")}`}
          >
            <PersonOutlineOutlinedIcon />
          </Link>
          <Link
            to="/favorites"
            aria-label="Улюблене"
            className={`${getIconClass("/favorites")}`}
          >
            <FavoriteBorderOutlinedIcon />
          </Link>
          <Link
            to="/cart"
            aria-label="Кошик"
            className={`${getIconClass("/cart")}`}
          >
            <ShoppingCartOutlinedIcon />
          </Link>
        </div>
      </div>
    
    </header>
  );
};

export default Header;
