import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";   // хук для токену користувача
import { Link } from "react-router-dom";
import { getUserOrders } from "../api/order";

type Order = {
  id: number;
  createdAt: string;
  total: number;
  status: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[];
};

export const MyOrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      setLoading(true);
      const data = await getUserOrders(token);
      if (data) setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, [token]);

  if (loading) return <div className="text-center py-10">Завантаження...</div>;

  if (!orders.length)
    return <div className="text-center py-10 text-gray-500">У вас ще немає замовлень.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Мої замовлення</h1>
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-semibold">Замовлення №{order.id}</span>
                <span className="ml-4 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString("uk-UA")}</span>
              </div>
              <div className={`px-3 py-1 text-xs rounded-full 
                ${order.status === "COMPLETED" ? "bg-green-100 text-green-700" : 
                  order.status === "CANCELLED" ? "bg-red-100 text-red-700" : 
                  "bg-yellow-100 text-yellow-700"}`}>
                {order.status === "COMPLETED" && "Завершено"}
                {order.status === "CANCELLED" && "Скасовано"}
                {order.status !== "COMPLETED" && order.status !== "CANCELLED" && "В обробці"}
              </div>
            </div>
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-3">
                  <img src={`http://localhost:8080${item.imageUrl}`} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">x{item.quantity}</div>
                  </div>
                  <div className="font-semibold">{item.price} грн</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2 text-lg font-bold">
              Всього: {order.total} грн
            </div>
            <div className="mt-2 text-right">
              <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline text-sm">Детальніше</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};