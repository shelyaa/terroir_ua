import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Wine, wineType } from "../../../types/Wine";
import { ChevronLeft } from "lucide-react";
import StarIcon from "@mui/icons-material/Star";
import { Info } from "lucide-react";
import { Loading } from "../../ui/loading";
import { useCart } from "../../../hooks/useCart";
import { RecommendationSlider } from "./RecommendationSlider";
import { WineDetailsSkeleton } from "../../ui/WineDetailsSkeleton";
import { getWineById } from "../../../api/wines";
import { API_BASE } from "../../../constants/apiConstant";

export const WineDetails = () => {
  const { id } = useParams();
  const [showAuthMessage, setShowAuthMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [checkoutDisabled, setCheckoutDisabled] = useState(false);
  const [wine, setWine] = useState<Wine | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { addWine, loading } = useCart();

  useEffect(() => {
    if (typeof id === "string") {
      const fetchWine = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          const data = await getWineById(id);
          setWine(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          setWine(null);
        }
      };
      fetchWine();
    } else {
      setWine(null);
    }
  }, [id]);

  if (!wine) return <WineDetailsSkeleton />;

  const handleClick = () => {
    addWine(wine, quantity, {
      onSuccess: () => {
        setShowSuccessMessage(true);
        setShowAuthMessage(false);
        setCheckoutDisabled(false);
      },
      onAuthRedirect: () => {
        setShowAuthMessage(true);
        setCheckoutDisabled(true);
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 py-4 sm:py-8 font-manrope font-medium text-sm">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-black mb-4 sm:mb-6"
      >
        <ChevronLeft className="mr-1" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Image and rating block - on mobile comes first */}
        <div className="flex flex-col items-center order-first md:order-last mb-2 md:mb-0">
          <img
            src={`${API_BASE} ${wine.imageUrl}`}
            alt={wine.name}
            className="w-full max-w-xs sm:w-90 "
          />
          <div className="mt-8 flex flex-col items-center w-full">
            <div className="flex items-center gap-2 sm:gap-4 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  fontSize="medium"
                  key={i}
                  className={
                    i < Math.round(wine.rate)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
              <p className="text-2xl sm:text-3xl font-medium font-cormorant ml-3 sm:ml-5">
                {wine.rate}
              </p>
            </div>
            <button className="border border-[#FCBA04] px-6 sm:px-30 py-2 text-xs font-bold bg-white mt-4 sm:mt-6 w-full sm:w-auto">
              Залишити відгук
            </button>
          </div>
        </div>

        {/* Wine details */}
        <div className="space-y-4 sm:space-y-6 w-full">
          <p className="text-2xl sm:text-4xl font-bold font-cormorant">
            {wine.name}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-25 text-lg sm:text-xl text-red-900 font-cormorant">
            <p>{wine.price} грн</p>
            <p>{wine.percentage}%</p>
            <p>{wine.volume} мл</p>
          </div>

          <div className="w-full max-w-xs">
            <p className="mb-2">Кількість</p>
            <div className="flex items-center justify-between border rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-xl"
              >
                –
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-xl"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-gray-700 text-justify w-full">
            <b>{wine.name}</b> — {wine.description.toLowerCase()}
          </p>

          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-4 w-full">
            <button
              className="w-full sm:w-auto px-6 sm:px-30 py-2 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition font-semibold"
              onClick={handleClick}
              disabled={checkoutDisabled}
            >
              {loading ? <Loading /> : "Додати до кошика"}
            </button>
          </div>

          {showAuthMessage && (
            <div className="text-[#2D6CDF] border-[#2D6CDF] border-1 flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 w-full sm:w-110">
              <p className="font-cormorant text-lg sm:text-xl">
                Щоб додати товар до кошика, увійдіть чи зареєструйтесь!
              </p>
              <Info strokeWidth={1.5} />
            </div>
          )}
          {showSuccessMessage && (
            <div className="text-[#2D6CDF] border-[#2D6CDF] border-1 flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 w-full sm:w-90">
              <a className="font-cormorant text-lg sm:text-xl" href="/order">
                Товар успішно додано до кошика!
              </a>
            </div>
          )}

          <div className="text-gray-700 text-sm mt-4 sm:mt-6 w-full text-justify">
            <h2 className="font-bold mb-1">Коментар від винороба:</h2>
            <p>{wine.ownerDescription}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-800 mt-4 sm:mt-6">
            <div className="*:mb-2 sm:*:mb-4">
              <p>
                <span className="font-bold">Тип вина</span> <br />
                {wineType[wine.type]}
              </p>
              <p>
                <span className="font-bold">Рік урожаю</span> <br />
                {wine.year}
              </p>
              <p>
                <span className="font-bold">Ступінь солодкості</span>
                <br />
                {wine.sweetness}
              </p>
              <p>
                <span className="font-bold">Сорт винограду</span>
                <br />
                {wine.variety}
              </p>
            </div>
            <div className="*:mb-2 sm:*:mb-4">
              <p>
                <span className="font-bold">Регіон виробництва</span>
                <br />
                {wine.region}
              </p>
              <p>
                <span className="font-bold">Виноробня</span>
                <br />
                {wine.producer}
              </p>
              <p>
                <span className="font-bold">Спосіб витримки</span>
                <br />
                {wine.agingMethod}
              </p>
            </div>
          </div>
        </div>
      </div>
      {id && <RecommendationSlider id={id} />}
    </div>
  );
};
