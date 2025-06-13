"use client";

import { useSearchParams } from "next/navigation";
import { useGetMyOrdersQuery } from "@/redux/features/orders/ordersApi";
import { IOrder, OrderStatus } from "@/types/order";
import { IMeta } from "@/types/meta";
import DataTablePagination from "@/components/ui/core/DataTable/DataTablePagination";
import { format } from "date-fns";
import OrderListSkeleton from "@/components/ui/core/Loader/OrderListSkeleton";
import Image from "next/image";

const MyOrdersManagement = () => {
  const searchParams = useSearchParams();
  const paramsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const { data, isLoading } = useGetMyOrdersQuery(paramsObj);
  const myOrders: IOrder[] = data?.data || [];
  const meta: IMeta = data?.meta || {};

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {isLoading ? (
        <OrderListSkeleton />
      ) : myOrders.length > 0 ? (
        myOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm bg-white space-y-3"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: <span className="font-medium">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Placed: {format(new Date(order.createdAt), "PPPp")}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  order.status === OrderStatus.PENDING
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === OrderStatus.COMPLETE
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.fruits.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 border rounded-md p-2"
                >
                  <Image
                    width={200}
                    height={200}
                    src={item.fruit.image}
                    alt={item.fruit.name}
                    className="w-16 h-16 object-cover rounded"
                    priority
                  />
                  <div>
                    <p className="font-semibold">{item.fruit.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} {item.fruit.unit} x{" "}
                      {item.fruit.offer_price}৳
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right font-semibold">
              Total:{" "}
              {order.fruits.reduce(
                (sum, item) =>
                  sum +
                  (item.quantity * item.fruit.offer_price) /
                    item.fruit.quantity,
                0
              )}
              ৳
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-8">
          You have no orders yet.
        </p>
      )}

      {!isLoading && myOrders.length > 0 && (
        <div className="flex justify-center mt-6">
          <DataTablePagination totalPage={meta?.totalPage || 1} />
        </div>
      )}
    </div>
  );
};

export default MyOrdersManagement;
