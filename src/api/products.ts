import axios from "axios";
import { Wine } from "../types/Wine";

type ErrorResponse = Record<string, string[]> | Record<string, string>;

export async function addProduct(
  prevState: unknown,
  formData: FormData,
  token?: string,
): Promise<Partial<ErrorResponse>> {
  try {

    console.log(token);
    const response = await axios.post<Wine>(
      "http://localhost:8080/wines", // або твій endpoint
      formData,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return {};
  } catch (error: any) {
    // обробка помилок як раніше
    if (error.response && error.response.data) {
      if (typeof error.response.data === "string") {
        return { general: error.response.data };
      }
      return error.response.data;
    }
    return { general: "Невідома помилка при додаванні продукту." };
  }
}