import { useState } from "react";
import { CartHeader } from "../components/features/cart/CartHeader";
import { Cart } from "../components/features/cart/Cart";
import { OrderForm } from "../components/features/order/OrderForm";

export const CheckoutPage = () => {
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
