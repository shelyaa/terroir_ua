import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { useAppDispatch } from "./hooks/redux-hooks";
import { setUser } from "./store/slices/userSlice";

export const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    console.log("userStr з localStorage:", userStr);

    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch(setUser(user));
      console.log("dispatch setUser:", user);
    }
    setLoading(false); 
  }, [dispatch]);

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
