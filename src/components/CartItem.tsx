import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeWineFromCart } from "../api/removeFromCart";
import { wineType } from "../types/Wine";
import { updateCartItem } from "../api/updateCartItem";

export const CartItem = ({ item, wine }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.cart.loading);

  if (!wine) {
    return <div className="p-4">Завантаження товару...</div>;
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(
        updateCartItem({ wineId: item.id, quantity: item.quantity - 1 })
      );
    }
  };

  const handleIncrement = () => {
    dispatch(
      updateCartItem({ wineId: item.id, quantity: item.quantity + 1 })
    );
  };

  const handleClear = () => {
    console.log("Deleting wineId:", item.wineId, wine.id);
  dispatch(removeWineFromCart(item.id));
  };

  return (
    <div className="relative flex items-center w-full py-8 px-6 gap-12 flex-col md:flex-row">
      <button
        onClick={handleClear}
        disabled={loading}
        className="absolute top-8 right-6 text-gray-500 hover:text-red-600 text-5xl"
        aria-label="Remove item"
        type="button"
      >
        ×
      </button>

      <div className="w-70 flex-shrink-0 flex justify-center">
        <img
          src={`http://localhost:8080${wine.imageUrl}`}
          alt="Вино"
          className="h-70 object-contain"
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold mb-6">{wine.name}</h2>
        <div className="flex items-baseline gap-10 mb-6">
          <span className="text-[#721b1a] text-2xl font-medium">
            {wine.price} грн
          </span>
          <span className="text-[#721b1a] text-2xl font-medium">
            {wine.volume} мл
          </span>
        </div>
        <div className="w-50 font-manrope text-sm">
          <p className="mb-2 ">Кількість</p>
          <div className="flex items-center border w-50 h-10">
            <button
              onClick={handleDecrement}
              className="flex-1 text-xl"
              type="button"
              disabled={item.quantity <= 1 || loading}
            >
              –
            </button>
            <span className="flex-1 text-center">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="flex-1 text-xl"
              type="button"
              disabled={loading}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="ml-25 min-w-[220px] md:grid grid-cols-2 gap-x-8 gap-y-4 text-lg hidden">
        <div>
          <div className="font-semibold">Тип вина</div>
          <div className="text-gray-600">{wineType[wine.type]}</div>
        </div>
        <div>
          <div className="font-semibold">Ступінь солодкості</div>
          <div className="text-gray-600">{wine.sweetness}</div>
        </div>
        <div>
          <div className="font-semibold">Рік урожаю</div>
          <div className="text-gray-600">{wine.year}</div>
        </div>
        <div>
          <div className="font-semibold">Сорт винограду</div>
          <div className="text-gray-600">{wine.variety}</div>
        </div>
      </div>
    </div>
  );
};
