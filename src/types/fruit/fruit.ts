import { IFruitCategory } from "../fruit-category";

export enum UnitType {
  KG = "kg",
  PIECE = "piece",
}

export interface IFruit {
  _id: string;
  name: string;
  image: string;
  regular_price: number;
  offer_price: number;
  inStock: boolean;
  description: string;
  unit: UnitType;
  quantity: number;
  category: IFruitCategory;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
