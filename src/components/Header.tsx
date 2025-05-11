import { FC } from "react";
import logo from "/logo/logo.png";

const Header: FC = () => {
  return (
    <header className="border-b-1 border-[#FCBA04] bg-[#F3F3F3] mb-1">
      <div className="container mx-15 flex h-[70px] items-center justify-between px-4">
        <div className="flex items-center gap-12">
          <a href="/" className="block h-[65px] w-[65px]">
            <span className="sr-only">Home</span>
            <img src={logo} alt="Logo" className="h-full w-full object-contain" />
          </a>

          <nav className="hidden md:block">
            <ul className="flex gap-10 text-xl text-[#5A5A5A] font-medium">
              <li><a className="hover:text-gray-700" href="/wine">Вина</a></li>
              <li><a className="hover:text-gray-700" href="/winery">Виноробні</a></li>
              <li><a className="hover:text-gray-700" href="/about-us">Про нас</a></li>
              <li><a className="hover:text-gray-700" href="/contacts">Контакти</a></li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <a href="/search" aria-label="Пошук">
            <img src="src/assets/search.svg" alt="Пошук" className="h-7 w-7" />
          </a>
          <a href="/account" aria-label="Акаунт">
            <img src="src/assets/user.svg" alt="Акаунт" className="h-7 w-7" />
          </a>
          <a href="/favorites" aria-label="Улюблене">
            <img src="src/assets/heart.svg" alt="Улюблене" className="h-7 w-7" />
          </a>
          <a href="/cart" aria-label="Кошик">
            <img src="src/assets/cart.svg" alt="Кошик" className="h-7 w-7" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
