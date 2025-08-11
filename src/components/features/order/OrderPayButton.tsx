import { useState } from "react";
import { Button } from "./ui/button";

export function OrderPayButton({ orderId }: { orderId: number }) {
  const [pending, setPending] = useState(false);

  const handlePay = async () => {
    const res = await fetch("http://localhost:8080/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    if (!res.ok) {
      alert("Помилка при створенні платежу");
      return;
    }
    const data = await res.json();
    window.location.href = data.sessionUrl;
  };

  return (
    <Button
      type="submit"
      disabled={pending}
      className="px-30 py-3 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition font-medium font-manrope text-sm flex items-center"
    >
      {pending ? "Збереження..." : "Оплатити"}
    </Button>
  );
}
