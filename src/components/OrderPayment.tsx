type OrderPaymentProps = {
  selected: string;
  setSelected: (selected: string) => void;
};

export const OrderPayment = ({selected, setSelected}: OrderPaymentProps) => {
  return (
    <div>
      <h1 className="text-2xl font-medium border-b pb-2 border-black mb-8 font-serif">
        Дані картки
      </h1>
      <div>
        <p className="font-manrope mb-4 font-normal">Оплатити за допомогою</p>
        <div className="flex flex-col gap-4 mt-4">
          <label className="flex items-center cursor-pointer gap-3">
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full border-4 ${
                selected === "card" ? "border-[#521b1a]" : "border-gray-300"
              }`}
              onClick={() => setSelected("card")}
              tabIndex={0}
              role="radio"
              aria-checked={selected === "card"}
            >
              <span
                className={`block w-2.5 h-2.5 rounded-full ${
                  selected === "card" ? "bg-[#521b1a]" : ""
                }`}
              />
            </span>
            <span
              className="text-sm font-manrope font-normal" 
              onClick={() => setSelected("card")}
            >
              Картка
            </span>
            <img
              src="/logo/visa-logo.png"
              alt="visa-logo"
              className="w-12 h-6 object-contain ml-2"
              draggable={false}
            />
            <img
              src="/logo/mastercard-logo.png"
              alt="mastercard-logo"
              className="w-10 h-6 object-contain"
              draggable={false}
            />
          </label>
          <label className="flex items-center cursor-pointer gap-3">
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full border-4 ${
                selected === "cash" ? "border-[#521b1a]" : "border-gray-300"
              }`}
              onClick={() => setSelected("cash")}
              tabIndex={0}
              role="radio"
              aria-checked={selected === "cash"}
            >
              <span
                className={`block w-2.5 h-2.5 rounded-full ${
                  selected === "cash" ? "bg-[#521b1a]" : ""
                }`}
              />
            </span>
            <span
              className="text-sm font-manrope font-normal "
              onClick={() => setSelected("cash")}
            >
              Накладений платіж
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
