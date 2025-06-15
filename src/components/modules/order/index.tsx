"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectOrderItems,
  selectOrderTotalPrice,
  increaseOrderQuantity,
  decreaseOrderQuantity,
  removeFromOrder,
  clearOrder,
} from "@/redux/features/orders/ordersSlice";
import { useForm } from "react-hook-form";
import { Minus, Plus, Trash2 } from "lucide-react";
import { usePlaceOrderMutation } from "@/redux/features/orders/ordersApi";
import ButtonSpinner from "@/components/ui/core/Loader/ButtonSpinner";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Image from "next/image";

const OrderManagement = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const orderItems = useAppSelector(selectOrderItems);
  const totalPrice = useAppSelector(selectOrderTotalPrice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      contact_number: "",
      address: "",
    },
  });

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const onSubmit = async (data: any) => {
    if (orderItems?.length === 0) {
      toast.error("Please select at least one fruit!");
      return;
    }
    const order_data = {
      ...data,
      fruits: orderItems.map((item) => ({
        fruit: item.fruit._id,
        quantity: item.quantity,
      })),
    };
    try {
      const res = await placeOrder(order_data).unwrap();
      if (res.success) {
        Swal.fire({
          title: "Success",
          text: "Your order has been placed successfully.",
          icon: "success",
        });
        dispatch(clearOrder());
        router.push(`/track-order?id=${res?.data?._id}`);
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Order</h2>

      {/* Customer Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg p-5 border shadow space-y-4 mb-6"
      >
        <h3 className="text-xl font-semibold mb-2">Customer Details</h3>

        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="w-full border px-4 py-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("contact_number", {
              required: "Contact number is required",
              pattern: {
                value: /^01[0-9]{9}$/,
                message: "Invalid Bangladeshi number",
              },
            })}
            placeholder="Contact Number"
            className="w-full border px-4 py-2 rounded"
          />
          {errors.contact_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact_number.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            rows={3}
            className="w-full border px-4 py-2 rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#27d15e] text-white px-6 py-2 rounded hover:bg-green-600 transition cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-1"
          disabled={isLoading}
        >
          Submit Order {isLoading && <ButtonSpinner />}
        </button>
      </form>

      {/* Order Items */}
      <div className="space-y-4">
        {orderItems.map((item) => (
          <div
            key={item.fruit._id}
            className="flex gap-4 items-start border p-4 rounded-lg shadow-sm bg-white"
          >
            <Image
              width={200}
              height={200}
              src={item.fruit.image}
              alt={item.fruit.name}
              className="w-20 h-20 rounded object-cover"
              priority
            />
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-base">{item.fruit.name}</h4>
                <button
                  onClick={() => dispatch(removeFromOrder(item.fruit._id))}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground">
                ৳{item.fruit.offer_price.toFixed(2)} × {item.quantity}{" "}
                {item.fruit.unit}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() =>
                    dispatch(decreaseOrderQuantity(item.fruit._id))
                  }
                  disabled={item.quantity <= 1}
                  className="bg-gray-200 text-gray-800 p-1 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(increaseOrderQuantity(item.fruit._id))
                  }
                  className="bg-gray-200 text-gray-800 p-1 rounded hover:bg-gray-300"
                >
                  <Plus size={16} />
                </button>
              </div>

              <p className="text-sm font-medium mt-1">
                Subtotal: ৳
                {(
                  (item.quantity * item.fruit.offer_price) /
                  item.fruit.quantity
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Grand Total */}
      <div className="mt-6 border-t pt-4 flex justify-between items-center text-xl font-semibold">
        <span>Grand Total</span>
        <span className="text-green-600">৳{totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderManagement;
