import axios from "axios";
import { Wine } from "../types/Wine";

type ErrorResponse = Record<string, string[]> | Record<string, string>;

export async function addProduct(
  formData: FormData,
  token?: string
): Promise<Partial<ErrorResponse>> {
  try {
    console.log(token);
    const response = await axios.post<Wine>(
      "http://localhost:8080/wines",
      formData,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return {};
  } catch (error: any) {
    if (error.response && error.response.data) {
      if (typeof error.response.data === "string") {
        return { general: error.response.data };
      }
      return error.response.data;
    }
    return { general: "Невідома помилка при додаванні продукту." };
  }
}

export async function updateProduct(
  id: string,
  formData: FormData,
  token?: string
): Promise<Partial<ErrorResponse>> {
  try {
    console.log(token);
    const response = await axios.put<Wine>(
      `http://localhost:8080/wines/${id}`,
      formData,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return {};
  } catch (error: any) {
    if (error.response && error.response.data) {
      if (typeof error.response.data === "string") {
        return { general: error.response.data };
      }
      return error.response.data;
    }
    return { general: "Невідома помилка при оновленні продукту." };
  }
}
