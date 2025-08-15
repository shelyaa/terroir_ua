import { Wine } from "./Wine";

export type OrderUser = {
  firstName: string;
  lastName: string;
  city: string;
  novaPoshtaBranch: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  details: string;
};

export type Order = {
  id: number;
  createdAt: string;
  totalPrice: number;
  items?: (Wine & {
    quantity: number;
    pricePerUnit: number;
    wineId?: number;
  })[];
};