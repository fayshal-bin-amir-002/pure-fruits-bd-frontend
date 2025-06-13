import { UserRole, UserStatus } from "@/redux/features/auth/authSlice";

export interface IUser {
  _id: string;
  phone_number: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
