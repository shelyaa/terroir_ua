import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Wine } from "../types/Wine";
import { ChevronLeft } from "lucide-react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StarIcon from "@mui/icons-material/Star";

export const WineDetails = () => {
  const { id } = useParams();
  const [wine, setWine] = useState<Wine | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchWine = async () => {
      const response = await fetch(`http://localhost:8080/wines/${id}`);
      const data = await response.json();
      setWine(data);
    };

    fetchWine();
  }, [id]);

  if (!wine)
    return <div className="text-center text-xl mt-10">Завантаження...</div>;

  return (
      <div className="max-w-6xl mx-auto px-6 py-8 font-manrope font-medium text-sm ">
        <Link
          to="/wine"
          className="flex items-center text-gray-500 hover:text-black mb-6"
        >
          <ChevronLeft className="mr-1" />
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold font-cormorant">{wine.name}</h1>

            <div className="flex items-center gap-25 text-xl text-red-900 font-cormorant">
              <p>{wine.price} грн</p>
              <p>{wine.percentage}%</p>
              <p>{wine.volume} мл</p>
            </div>

            <div className="w-50">
              <p className="mb-2">Кількість</p>
              <div className="flex items-center justify-between border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-xl "
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

            <p className="text-gray-700 text-justify w-100 ">
              <b>{wine.name}</b> — {wine.description.toLowerCase()}
            </p>

            <div className="flex items-center gap-4 mt-4 w-[500px]">
              <button className=" px-30 py-2 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition  font-semibold">
                Додати до кошика
              </button>
              <div className="rounded-full border-1 border-[#590004]  bg-white  w-8 h-8 flex items-center justify-center">
                <FavoriteBorderOutlinedIcon
                  className="cursor-pointer text-[#521b1a]"
                  fontSize="small"
                />
              </div>
            </div>

            <div className="text-gray-700 text-sm mt-6 w-100 text-justify">
              <h2 className="font-bold mb-1">Коментар від винороба:</h2>
              <p className="">{wine.ownerDescription}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-800 mt-6">
              <div className="*:mb-4">
                <p>
                  <span className="font-bold">Тип вина</span> <br />
                  {wine.type}
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
              <div className="*:mb-4">
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

          <div className="items-center">
            <img
              src={wine.imagePath}
              alt={wine.name}
              className="w-125 object-contain"
            />
            <div>
              <div className="mt-20 flex flex-col items-center">
                <div className="flex items-center gap-4 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                    fontSize="large"
                      key={i}
                      className={
                        i < Math.round(wine.rate)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <p className="text-3xl font-medium font-cormorant ml-5">
                    {wine.rate}
                  </p>
                </div>

                <button className="border border-[#FCBA04] px-30 py-2 text-xs font-bold bg-white mt-6">
                  Залишити відгук
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
