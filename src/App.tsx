import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import { useState } from "react";
import { SearchBar } from "./components/SearchBar";

export const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="relative">
      <Header onOpenSearch={setIsSearchOpen} isSearchOpen={isSearchOpen} />

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsSearchOpen(false)}
        ></div>
      )}

      {isSearchOpen && (
        <div className="absolute top-[71px] left-0 w-full z-40">
          <SearchBar />
        </div>
      )}
      <div
        className={`${isSearchOpen ? "pointer-events-none blur-sm" : ""} relative z-10`}
      >
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
