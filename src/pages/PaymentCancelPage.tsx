import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';

export const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 my-4">
        <button
          onClick={() => navigate("/order")}
          className="text-gray-500 hover:text-black "
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-3xl font-semibold">Корзина</h1>
      </div>
      <div className="border-2 border-red-700 flex flex-col items-center p-10">
        <X size={50} color="#B3261E" strokeWidth={0.8}/>
        <p className="text-red-700 text-3xl font-semibold my-4">Ой, щось пішло не так!</p>
        <p className=" font-manrope font-normal text-gray-500">Під час оплати сталась помилка, поверніться і спробуйте, будь ласка, ще раз.</p>
      </div>
    </div>
  );
};
