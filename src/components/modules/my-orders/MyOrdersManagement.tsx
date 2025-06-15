"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useGetMyOrderQuery } from "@/redux/features/orders/ordersApi";
import { IOrder } from "@/types/order";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { FileDown } from "lucide-react";
import ViewMyOrder from "./ViewMyOrder";
import { generatePdfFromDom } from "@/helper/generateInvoice";

const TrackOrderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("id") || "";
  const [openView, setOpenView] = useState<boolean>(false);

  const [orderId, setOrderId] = useState(orderIdParam);
  const [submittedId, setSubmittedId] = useState(orderIdParam);

  const { data, isLoading, refetch } = useGetMyOrderQuery(submittedId, {
    skip: !submittedId,
  });

  const order: IOrder | undefined = data?.data || undefined;

  const handleSearch = () => {
    if (orderId.trim()) {
      setSubmittedId(orderId.trim());
      router.push(`?id=${orderId.trim()}`);
    }
  };

  useEffect(() => {
    if (submittedId) {
      refetch();
    }
  }, [submittedId]);

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Track Your Order</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Enter your order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          type="search"
        />
        <Button onClick={handleSearch} className="cursor-pointer">
          Search
        </Button>
      </div>

      {isLoading && <LoadingSpinner />}

      {!isLoading && order && (
        <div className="border p-4 rounded-lg shadow-md space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
              <p className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                {order.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpenView(true)}
            >
              See Details
            </Button>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => generatePdfFromDom("pdf-container", order?._id)}
            >
              <FileDown className="w-4 h-4 mr-1" />
              Download Invoice
            </Button>
          </div>
        </div>
      )}

      {!isLoading && submittedId && !order && (
        <p className="text-center text-red-500 font-medium mt-20 text-2xl">
          Order not found
        </p>
      )}
      <ViewMyOrder order={order} onOpenChange={setOpenView} isOpen={openView} />

      {!isLoading && order && (
        <div
          className="bg-white text-gray-900 rounded-lg p-4 shadow-md mx-auto font-sans"
          id="pdf-container"
        >
          <h2 className="text-2xl font-extrabold mb-4 border-b pb-2 border-gray-300">
            Pure Fruits BD
          </h2>

          <div className="mb-6 space-y-1 text-sm">
            <p>
              <span className="font-semibold">Order ID:</span> {order?._id}
            </p>
            <p>
              <span className="font-semibold">Name:</span> {order?.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {order?.contact_number}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {order?.address}
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-1">
            Order Summary
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-2 px-3 border-b border-gray-300">
                    Fruit
                  </th>
                  <th className="text-center py-2 px-3 border-b border-gray-300">
                    Qty
                  </th>
                  <th className="text-right py-2 px-3 border-b border-gray-300">
                    Unit Price
                  </th>
                  <th className="text-right py-2 px-3 border-b border-gray-300">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.fruits?.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-2 px-3">{item.fruit.name}</td>
                    <td className="py-2 px-3 text-center">{item.quantity}</td>
                    <td className="py-2 px-3 text-right">
                      ৳ {item.fruit.offer_price.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-right">
                      ৳{" "}
                      {(
                        (item.quantity * item.fruit.offer_price) /
                        item.fruit.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold text-lg">
                  <td colSpan={3} className="py-3 px-3 text-right">
                    Total
                  </td>
                  <td className="py-3 px-3 text-right">
                    ৳{" "}
                    {order?.fruits
                      ?.reduce(
                        (sum, item) =>
                          sum +
                          (item.quantity * item.fruit.offer_price) /
                            item.fruit.quantity,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
