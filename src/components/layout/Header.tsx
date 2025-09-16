import { FC, useState } from "react";
import logo from "/logo/logo.png";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useAuth } from "../../hooks/useAuth";
import { getIconClass, getPageClass } from "../../utils/navigationStyles";
import { Menu, X } from "lucide-react";
import { CartLink } from "../features/cart/CartLink";

type HeaderProps = {
  isSearchOpen: boolean;
  onOpenSearch: (isSearchOpen: boolean) => void;
};

export const Header: FC<HeaderProps> = ({ onOpenSearch, isSearchOpen }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { isAuth } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" bg-[#F3F3F3] relative mb-1">
      <div className="w-full max-w-8xl flex h-[70px] items-center justify-between md:px-14 px-4 border-b-1 border-[#FCBA04]">
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
                <Link
                  to="/wine"
                  className={`${getPageClass("/wine", isActive)}`}
                >
                  Вина
                </Link>
              </li>
              <li>
                <Link
                  className={`${getPageClass("/winery", isActive)}`}
                  to="/winery"
                >
                  Виноробні
                </Link>
              </li>
              <li>
                <Link
                  className={`${getPageClass("/about", isActive)}`}
                  to="/about"
                >
                  Про нас
                </Link>
              </li>
              <li>
                <Link
                  className={`${getPageClass("/contacts", isActive)}`}
                  to="/contacts"
                >
                  Контакти
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6 text-[#5A5A5A]">
          <button
            onClick={() => {
              onOpenSearch(!isSearchOpen);
            }}
            aria-label="Пошук"
            className={` p-2 rounded-full transition duration-200 w-10 h-10 flex items-center justify-center hover:text-black ${isSearchOpen ? "border-1 border-[#590004] text-[#590004] bg-white" : ""} `}
          >
            <SearchIcon />
          </button>
          <Link
            to={isAuth ? "/account" : "/login"}
            aria-label="Акаунт"
            className={getIconClass(isAuth ? "/account" : "/login", isActive)}
          >
            <PersonOutlineOutlinedIcon />
          </Link>

          <CartLink isActive={isActive} />
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col  shadow-md py-4 font-medium  text-xl text-gray-600 w-full px-4  ">
          <Link
            to="/wine"
            className={`${getPageClass("/wine", isActive)} justify-start`}
          >
            Вина
          </Link>
          <Link
            className={`${getPageClass("/winery", isActive)} justify-start`}
            to="/winery"
          >
            Виноробні
          </Link>
          <Link
            className={`${getPageClass("/about", isActive)} justify-start`}
            to="/about"
          >
            Про нас
          </Link>
          <Link
            className={`${getPageClass("/contacts", isActive)} justify-start`}
            to="/contacts"
          >
            Контакти
          </Link>
        </div>
      )}
    </header>
  );
};
