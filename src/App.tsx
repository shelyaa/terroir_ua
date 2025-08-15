import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/features/filtration/SearchBar";
import { useAppDispatch } from "./hooks/redux";
import { setUser } from "./store/slices/userSlice";
import { fetchCart } from "./api/fetchCart";
import { useAuth } from "./hooks/useAuth";

export const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

  useEffect(() => {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch(setUser(user));
      if (token) {
        dispatch(fetchCart());
      }
    }
    setLoading(false);
  }, [dispatch, token]);

  if (loading) return null;

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
          <SearchBar setIsSearchOpen={setIsSearchOpen} />
        </div>
      )}

      <div
        className={`${isSearchOpen ? "pointer-events-none blur-xs" : ""} relative z-10`}
      >
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
