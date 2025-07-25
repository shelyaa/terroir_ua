import { useState } from "react";
import { Cart } from "../components/Cart";
import { OrderForm } from "../components/OrderForm";
import { CartHeader } from "../components/CartHeader";

export const PurchasePage = () => {
  const [step, setStep] = useState<"cart" | "order">("cart");

  const handleCheckout = () => setStep("order");
  const handleBack = () => setStep("cart");

  return (
    <div>
      <CartHeader step={step} />
      {step === "cart" && <Cart onCheckout={handleCheckout} />}
      {step === "order" && <OrderForm onReturn={handleBack} />}
    </div>
  );
};
