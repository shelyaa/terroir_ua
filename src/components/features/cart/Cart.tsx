import { ChevronLeft } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchCart } from "../../../api/fetchCart";
import { CartItem } from "./CartItem";
import { SkeletonCartItem } from "../../ui/SkeletonCartItem";
import { useAuth } from "../../../hooks/useAuth";
import { Wine } from "../../../types/Wine";

type CartProps = {
  onCheckout: () => void;
};

export const Cart = ({ onCheckout }: CartProps) => {
  const { token } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const amount = useAppSelector((state) => state.cart.amount);
  const deliveryPrice = useAppSelector((state) => state.cart.deliveryPrice);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const error = useAppSelector((state) => state.cart.error);

  const [loading, setLoading] = useState(true);

  const [wines, setWines] = useState<Record<string, Wine>>({});

  useEffect(() => {
    if (token) {
      setLoading(true);
      dispatch(fetchCart()).finally(() =>
        setTimeout(() => setLoading(false), 500)
      );
    } else {
      setLoading(false);
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!cartItems.length) {
      setWines({});
      return;
    }
    // setLoading(true);
    Promise.all(
      cartItems.map((item) =>
        fetch(`http://localhost:8080/wines/${item.wineId}`)
          .then((res) => res.json())
          .then((data) => [item.wineId, data])
      )
    ).then((results) => {
      setWines(Object.fromEntries(results));
    });
    // .finally(() => setLoading(false));
  }, [cartItems]);

  const renderCartItems = useCallback(
    () =>
      cartItems
        .slice()
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((item) => (
          <CartItem key={item.id} item={item} wine={wines[item.wineId]} />
        )),
    [cartItems, wines]
  );

  if (error) {
    return <div className="text-center text-red-600 p-10 text-xl">{error}</div>;
  }

  return (
    <div className="max-w-7xl md:mx-auto mx-4">
      <div className="flex items-center gap-2 my-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-3xl font-semibold">Кошик для покупок</h1>
      </div>

      {!loading && cartItems.length === 0 && isAuth && (
        <div className="text-2xl font-semibold justify-center flex p-30">
          Ваш кошик порожній
        </div>
      )}

      {!loading && !isAuth && (
        <div className="flex flex-col items-center justify-center h-[60vh] font-manrope">
          <p className="text-lg md:text-xl font-semibold mb-8 text-center ">
            Щоб додати товар у кошик — увійдіть або зареєструйтесь!
          </p>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-6 py-2 rounded-md bg-bordo text-white font-medium hover:bg-red-900 transition"
            >
              Увійти
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-md bg-bordo text-white font-medium hover:bg-red-900 transition"
            >
              Зареєструватись
            </Link>
          </div>
        </div>
      )}

      <div className="bg-white">
        {loading && (
          <div className="pt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCartItem key={i} />
            ))}
          </div>
        )}
        {renderCartItems()}

        {cartItems.length > 0 && (
          <div className="flex flex-col w-full items-center mx-4">
            <div className="flex flex-row justify-between w-full md:max-w-md mb-8 md:text-2xl text-xl max-w-2xs">
              <div className="flex flex-col gap-2">
                <p className="font-medium">Проміжний підсумок</p>
                <p className="font-medium">Доставка</p>
                <p className="font-semibold mt-2">Всього</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-medium">{amount} грн</p>
                <p className="font-medium">{deliveryPrice} грн</p>
                <p className="font-semibold mt-2">{totalPrice} грн</p>
              </div>
            </div>
            <button
              className="md:px-30 py-2 mb-6 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition text-sm font-semibold font-manrope px-10"
              onClick={onCheckout}
            >
              Перейти до оплати
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
