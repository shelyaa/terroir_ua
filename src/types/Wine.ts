import { Types } from "./Types";

export type Wine = {
    volume?: number;
    id: string;
    name: string;
    price: number;
    description: string;
    imagePath: string;
    agingMethod?: string;
    region?: string;
    dateAdded?: Date;
    percentage?: number;
    year?: number;
    producer?: string;
    sweetness?: string;
    isDeleted?: boolean;
    rate: number;
    type: Types;
    ownerDescription?: string;
    variety?: string;
  };