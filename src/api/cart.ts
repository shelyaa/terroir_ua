import axios from "axios";

export const addWineToCart = async (wineId: string, quantity: number, token: string) => {
  try {
    await axios.post(
      "http://localhost:8080/cart",
      { wineId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Не вдалося додати у кошик:", error);
  }
};
export const removeWineFromCart = async (wineId: string, token: string) => {
  try {
    await axios.delete(
      `http://localhost:8080/cart/cart-items/${wineId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Не вдалося видалити з кошика:", error);
  }
};