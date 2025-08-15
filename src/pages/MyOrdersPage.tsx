import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getOrderItems, getUserOrders } from "../api/order";
import { getWineById } from "../api/wines";
import { Loading } from "../components/ui/loading";
import { Order } from "../types/Order";
import { OrderItem } from "../types/orderItem";

export const MyOrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      setLoading(true);

      const data = await getUserOrders(token);
      if (data) {
        const ordersData = data.content;
        const reversedOrdersData = ordersData.reverse();

        const ordersWithItems = await Promise.all(
          reversedOrdersData.map(async (order: Order) => {
            const itemsData = await getOrderItems(order.id.toString(), token);

            const itemsWithDetails = await Promise.all(
              (itemsData?.content || []).map(async (item: OrderItem) => {
                try {
                  const wineDetails = await getWineById(item.wineId);
                  console.log(item);
                  if (wineDetails) {
                    return { ...item, ...wineDetails };
                  }
                } catch {
                  return {
                    ...item,
                    imageUrl: "/wine/wine.png",
                    name: "Вино видалено",
                    isDeleted: true,
                  };
                }
              })
            );
            return {
              ...order,
              items: itemsWithDetails,
            };
          })
        );

        setOrders(ordersWithItems);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [token]);

  if (loading)
    return (
      <div className="text-center py-30 flex justify-center">
        <Loading />
      </div>
    );

  if (!orders.length)
    return (
      <div className="text-center py-30 text-2xl">
        У вас ще немає замовлень.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Мої замовлення</h1>
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm bg-white px-8"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-semibold text-2xl">
                  Замовлення №{order.id}
                </span>
              </div>
            </div>

            <div className="divide-y">
              {order.items?.map((item) =>
                item.isDeleted ? (
                  <div
                    key={item.wineId || item.id}
                    className="flex items-center gap-4 py-3 text-xl pointer-events-none"
                  >
                    <img
                      src="/wine/wine.png"
                      alt={item.name}
                      className="w-32 h-40 object-cover rounded opacity-50 grayscale"
                      style={{ cursor: "not-allowed" }}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-400 italic">
                        Товар видалено
                      </div>
                      <div className="text-gray-500">x {item.quantity}</div>
                    </div>
                    <div className="font-semibold">{item.pricePerUnit} грн</div>
                  </div>
                ) : (
                  <a
                    href={`/wine/${item.id}`}
                    key={item.wineId || item.id}
                    className="hover:opacity-60 transition-opacity duration-300"
                  >
                    <div className="flex items-center gap-4 py-3 text-xl">
                      <img
                        src={
                          item.isDeleted
                            ? item.imageUrl
                            : `http://localhost:8080${item.imageUrl}`
                        }
                        alt={item.name}
                        className="w-32 h-40 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-500">x {item.quantity}</div>
                      </div>
                      <div className="font-semibold">
                        {item.pricePerUnit} грн
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>

            <div className="flex mt-2 text-xl font-bold">
              Всього: {order.totalPrice} грн
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
