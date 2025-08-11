type CartHeaderProps = {
  step: string;
};

export const CartHeader = ({ step }: CartHeaderProps) => (
  <div>
    <div className="flex w-full px-12 gap-4 mt-4">
      <div className="h-[4px] bg-[#541b1b] w-[50%]" />
      <div className={`h-[4px] ${step === "order" ? "bg-[#541b1b]" : "bg-[#d1d1d1]"} w-[50%]`} />
    </div>
  </div>
);
