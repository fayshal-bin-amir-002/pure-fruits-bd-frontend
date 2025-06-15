import { IFruit } from "../fruit/fruit";

export interface IOrderFruitItem {
  fruit: IFruit;
  quantity: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  CANCELED = "CANCELED",
}

export interface IOrder {
  _id: string;
  name: string;
  address: string;
  contact_number: string;
  fruits: IOrderFruitItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
