
export type Types = "RED" | "WHITE" | "PINK" | "SPARKLING" | "DESSERT" | "PORTWEIN" | "ORANGE";

export type Wine = {
  volume: number;
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  agingMethod: string;
  region: string;
  dateAdded: Date;
  percentage: number;
  year: number;
  producer: string;
  sweetness: string;
  isDeleted: boolean;
  rate: number;
  type: Types;
  ownerDescription: string;
  variety: string;
};

export const wineType: Record<string, string> = {
  RED: "Червоне",
  WHITE: "Біле",
  PINK: "Рожеве",
  SPARKLING: "Ігристе",
  DESSERT: "Десертне",
  PORTWEIN: "Портвейн",
  ORANGE: "Апельсинове",
};

export const wineTypeReverseMap: Record<string, string> = {
  "Червоне": "RED",
  "Біле": "WHITE",
  "Рожеве": "PINK",
  "Ігристе": "SPARKLING",
  "Десертне": "DESSERT",
  "Портвейн": "PORTWEIN",
  "Апельсинове": "ORANGE",
};
