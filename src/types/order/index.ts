import { IFruit } from "../fruit/fruit";
import { IUser } from "../user";

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
  customer: IUser;
  name: string;
  address: string;
  contact_number: string;
  fruits: IOrderFruitItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
