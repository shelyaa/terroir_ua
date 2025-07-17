import { ChevronLeft } from "lucide-react";

export const Order = ({ onReturn }) => {
  

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 my-4">
        <button onClick={onReturn} className="text-gray-500 hover:text-black ">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-3xl font-semibold">Деталі замовлення</h1>
      </div>

      <div className="bg-white">
        

        <div className="flex flex-col w-full items-center">
        
          <button className="px-30 py-2 mb-6 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition text-sm font-semibold font-manrope">
            Перейти до оплати
          </button>
        </div>
      </div>
    </div>
  );
};
