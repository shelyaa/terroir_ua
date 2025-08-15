import { ChevronLeft } from "lucide-react";
import { FormInput } from "../../ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "../../ui/textarea";
import { useNavigate } from "react-router-dom";
import { Label } from "../../ui/label";
import { useAppSelector } from "../../../hooks/redux";
import { useAuth } from "../../../hooks/useAuth";
import { OrderUser } from "../../../types/Order";
import { createOrder } from "../../../api/order";
import { OrderPayment } from "./OrderPayment";
import { Button } from "../../ui/button";
import { PatternFormat } from "react-number-format";

type OrderProps = {
  onReturn: () => void;
};

export const OrderForm = ({ onReturn }: OrderProps) => {
  const [error, setError] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [selected, setSelected] = useState("card");
  const checkoutUser = useAppSelector((state) => state.checkoutUser);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [orderFormData, setOrderFormData] = useState<OrderUser>({
    firstName: checkoutUser?.firstName || "",
    lastName: checkoutUser?.lastName || "",
    city: checkoutUser?.city || "",
    novaPoshtaBranch: checkoutUser?.novaPoshtaBranch || "",
    address: checkoutUser?.address || "",
    zipCode: checkoutUser?.zipCode || "",
    phoneNumber: checkoutUser?.phoneNumber || "",
    details: checkoutUser?.details || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setOrderFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const errors: Record<string, string> = {};
    if (!orderFormData.firstName) errors.firstName = "Введіть імʼя";
    if (!orderFormData.lastName) errors.lastName = "Введіть прізвище";
    if (!orderFormData.city) errors.city = "Введіть місто";
    if (!orderFormData.novaPoshtaBranch && !orderFormData.address)
      errors.novaPoshtaBranch =
        "Введіть відділення або адресу та поштовий індекс";
    if (orderFormData.address && !orderFormData.zipCode)
      errors.zipCode = "Введіть поштовий індекс";
    if (!orderFormData.phoneNumber)
      errors.phoneNumber = "Введіть номер телефону";
    setError(errors);
    if (Object.keys(errors).length > 0) {
      setPending(false);
      return;
    }

    let shippingAddress = "";
    if (orderFormData.novaPoshtaBranch) {
      shippingAddress = `м. ${orderFormData.city}, Нова пошта - відділення №${orderFormData.novaPoshtaBranch}.`;
    } else if (orderFormData.address) {
      shippingAddress = `м. ${orderFormData.city}, ${orderFormData.address}, індекс ${orderFormData.zipCode}.`;
    }

    const payload = {
      firstName: orderFormData.firstName,
      lastName: orderFormData.lastName,
      shippingAddress: shippingAddress,
      zipCode: Number(orderFormData.zipCode),
      phoneNumber: orderFormData.phoneNumber,
      details: orderFormData.details || "-",
    };

    if (!token) {
      alert("Немає токена авторизації!");
      return;
    }
    console.log(token);

    const orderId = await createOrder(payload, token);

    if (selected === "cash") {
      navigate("/payments/success");
      return;
    }

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
    setPending(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 my-4">
        <button onClick={onReturn} className="text-gray-500 hover:text-black ">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-3xl font-semibold">Деталі замовлення</h1>
      </div>

      <div className="bg-white p-8">
        <div className="mx-auto max-w-7xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 grid md:grid-cols-2 grid-cols-1 md:gap-20 max-w-7xl px-10"
          >
            <div>
              <div className="space-y-2 mb-4">
                <Label
                  className="font-manrope font-normal text-sm"
                  htmlFor="firstName"
                >
                  Імʼя
                </Label>
                <FormInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Імʼя"
                  value={orderFormData.firstName}
                  onChange={handleChange}
                />
                {error.firstName && (
                  <div className="text-destructive">{error.firstName}</div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <Label
                  className="font-manrope font-normal text-sm"
                  htmlFor="lastName"
                >
                  Прізвище
                </Label>
                <FormInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Прізвище"
                  value={orderFormData.lastName}
                  onChange={handleChange}
                />
                {error.lastName && (
                  <div className="text-destructive">{error.lastName}</div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <Label
                  className="font-manrope font-normal text-sm"
                  htmlFor="city"
                >
                  Місто
                </Label>
                <FormInput
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Введіть тут"
                  value={orderFormData.city}
                  onChange={handleChange}
                />
                {error.city && (
                  <div className="text-destructive">{error.city}</div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <Label
                  className="font-manrope font-normal text-sm"
                  htmlFor="novaPoshtaBranch"
                >
                  № Відділення Нової пошти
                </Label>
                <FormInput
                  type="text"
                  id="novaPoshtaBranch"
                  name="novaPoshtaBranch"
                  placeholder="Введіть тут"
                  value={orderFormData.novaPoshtaBranch}
                  onChange={handleChange}
                />
                {error.novaPoshtaBranch && (
                  <div className="text-destructive">
                    {error.novaPoshtaBranch}
                  </div>
                )}
              </div>
              <div className="space-y-2 mb-4 font-manrope text-center text-base font-normal">
                або
              </div>
              <div className="space-y-2 mb-4">
                <Label
                  className="font-manrope font-normal text-sm"
                  htmlFor="address"
                >
                  Адреса
                </Label>
                <FormInput
                  type="text"
                  id="address"
                  placeholder="Введіть тут"
                  name="address"
                  value={orderFormData.address}
                  onChange={handleChange}
                />
                {error.address && (
                  <div className="text-destructive">{error.address}</div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <Label
                  className="font-manrope font-normal text-sm"
                  htmlFor="zipCode"
                >
                  Поштовий індекс
                </Label>
                <FormInput
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="Введіть тут"
                  value={orderFormData.zipCode}
                  onChange={handleChange}
                />
                {error.zipCode && (
                  <div className="text-destructive">{error.zipCode}</div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <Label
                  className="font-manrope font-normal text-sm"
                  htmlFor="phoneNumber"
                >
                  Номер телефону
                </Label>
                <PatternFormat
                  customInput={FormInput}
                  type="tel"
                  format="+38 (###) ###-##-##"
                  mask="_"
                  name="phoneNumber"
                  id="phone"
                  placeholder="Введіть тут"
                  value={orderFormData.phoneNumber}
                  onChange={handleChange}
                />
                {error.phoneNumber && (
                  <div className="text-destructive">{error.phoneNumber}</div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <Label
                  className="font-manrope font-normal text-sm"
                  htmlFor="details"
                >
                  Деталі замовлення
                </Label>
                <Textarea
                  id="details"
                  name="details"
                  value={orderFormData.details}
                  onChange={handleChange}
                  className="border-1 border-black"
                />
                {error.details && (
                  <div className="text-destructive">{error.details}</div>
                )}
              </div>
            </div>
            <div className="">
              <OrderPayment selected={selected} setSelected={setSelected} />
              <Button
                type="submit"
                disabled={pending}
                className="w-full py-3 bg-[#521b1a] text-white hover:bg-[#6b2a28] transition font-medium font-manrope text-sm flex items-center my-6"
              >
                {pending ? "Збереження..." : "Оплатити"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
