import logo from "/logo/logo.png";
import { Link, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import { getIconClass, getPageClass } from "../utils/navigationStyles";

export const AdminHeader = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b-1 border-[#FCBA04] bg-[#F3F3F3] relative mb-1">
      <div className="w-full max-w-8xl flex h-[70px] items-center justify-between px-14">
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
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6 text-[#5A5A5A]">
          <Link
            to="/admin/products"
            aria-label="Створити Вино"
            className={`${getIconClass("/admin/products", isActive)}`}
          >
            <AddCircleOutlineIcon />
          </Link>
          <Link
            to="/admin"
            aria-label="Аналітика"
            className={`${getIconClass("/admin", isActive)}`}
          >
            <BarChartIcon />
          </Link>
          <Link
            to="/admin/account"
            aria-label="Акаунт"
            className={`${getIconClass("/admin/account", isActive)} `}
          >
            <PersonOutlineOutlinedIcon />
          </Link>
        </div>
      </div>
    </header>
  );
};
