import { useState } from "react";
import { Cart } from "../components/Cart";
import { Order } from "../components/Order";
import { CartHeader } from "../components/CartHeader";

export const PurchasePage = () => {
  const [step, setStep] = useState<'cart' | 'order'>('cart');

   const handleCheckout = () => setStep('order');
  const handleBack = () => setStep('cart');

  return (
    <div>
      <CartHeader step={step} />
      {step === 'cart' && <Cart onCheckout={handleCheckout} />}
      {step === 'order' && <Order onReturn={handleBack} />}
    </div>
  );
};
