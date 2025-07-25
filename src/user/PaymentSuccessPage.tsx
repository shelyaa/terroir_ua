import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="md:max-w-7xl mx-auto max-w-xs">
      <div className="flex items-center gap-2 my-4">
        <button
          onClick={() => navigate("/wine")}
          className="text-gray-500 hover:text-black "
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-3xl font-semibold">Каталог вин</h1>
      </div>
      <div className="border-2 border-[#3E7C47] flex flex-col items-center p-10">
        <Check size={50} color="#3E7C47" strokeWidth={0.8}/>
        <p className="text-[#3E7C47] text-3xl font-semibold my-4">Ваше замовлення успішно додано!</p>
        <p className=" font-manrope font-normal text-gray-500">Всі коментарі та критерії враховано, і вино скоро буде у вас</p>
      </div>
    </div>
  );
};
