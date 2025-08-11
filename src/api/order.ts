import axios from "axios";

export const createOrder = async (payload: any, token: string) => {
  try {
    const response = await axios.post("http://localhost:8080/orders", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });
    const data = response.data;
    console.log(data);
    const orderId = data.id;
    if (!orderId) throw new Error("Помилка при створенні замовлення");
    return orderId;
  } catch (err: any) {
    alert("Помилка: " + (err?.response?.data?.message || err.message));
    return null;
  }
};

export const getUserOrders = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:8080/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    alert("Помилка: " + (err?.response?.data?.message || err.message));
    return null;
  }
};

export const getOrderItems = async (id: string, token: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/orders/${id}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    alert("Помилка: " + (err?.response?.data?.message || err.message));
    return null;
  }
};


