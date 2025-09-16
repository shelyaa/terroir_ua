import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

export const Account = () => {
  const { email, name } = useAppSelector((state) => state.user);

  return (
    <div className="mx-auto grid md:grid-cols-2 py-6 max-w-7xl items-start gap-5 grid-cols-1">
      <div className="font-manrope mb-4 font-medium">
        <div className="mb-2">{name}</div>
        <div>{email}</div>
      </div>
      <ul className="[&_li]:text-xl font-medium w-75 [&_li]:mb-7 border-gray pl-3 [&_li]:pb-1">
        <Link to="/account/my-orders">
          <li className="border-b hover:text-gray-700">Мої замовлення</li>
        </Link>
        <li>
          <SettingsDropdown />
        </li>
      </ul>
    </div>
  );
};

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { removeUser } from "../../../store/slices/userSlice";
import { clearCart } from "../../../store/slices/cartSlice";

export const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem("user");
    dispatch(clearCart());
  };

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full border-b border-gray-200 pb-1 mb-2 cursor-pointer hover:text-gray-700"
        type="button"
      >
        Налаштування
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="flex flex-col font-manrope text-sm">
          <Link
            to={"/"}
            className="text-left py-2 border-b border-gray-300 hover:bg-gray-100"
          >
            Редагувати дані профілю
          </Link>

          <button
            className="text-left py-2 border-b border-gray-300  hover:bg-gray-100 text-red-600"
            type="button"
            onClick={handleLogout}
          >
            Вийти
          </button>
        </div>
      )}
    </div>
  );
};
