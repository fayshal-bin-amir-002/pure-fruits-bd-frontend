"use client";

import {
  CartItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2 } from "lucide-react";
import { addMultipleToOrder } from "@/redux/features/orders/ordersSlice";
import { useRouter } from "next/navigation";

const FloatingCartButton = () => {
  const [shake, setShake] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const items = useAppSelector(selectCartItems);
  const itemCount = items?.length;
  const total = useAppSelector(selectCartTotalPrice);

  const handleOrder = (fruits: CartItem[]) => {
    dispatch(addMultipleToOrder(fruits));
    router.push("/order");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={`${itemCount > 0 ? "flex" : "hidden"}
        fixed bottom-8 right-8 z-50 cursor-pointer 
        bg-[#27d15e] text-white 
        w-14 h-14 rounded-full 
        items-center justify-center 
        shadow-2xl transition-all duration-300 
        hover:scale-105 active:scale-95
        ${shake ? "animate-shake" : ""}
      `}
          aria-label="Open cart"
        >
          <div className="relative">
            <ShoppingCart size={30} strokeWidth={2.2} />
            <span className="absolute -top-2 -right-3 bg-white text-[#27d15e] text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
              {itemCount}
            </span>
          </div>
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[400px]" forceMount>
        <SheetHeader>
          <SheetTitle className="text-xl">Your Cart</SheetTitle>
          <SheetDescription>
            You have {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart.
          </SheetDescription>
        </SheetHeader>

        <div className="px-2">
          <div className="mt-4 space-y-4 overflow-y-auto max-h-[60vh] pr-1">
            {items.map((item) => (
              <div
                key={item.fruit._id}
                className="flex gap-4 items-start border p-3 rounded-lg shadow-sm"
              >
                <img
                  src={item.fruit.image}
                  alt={item.fruit.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-base">
                      {item.fruit.name}
                    </h4>
                    <button
                      onClick={() => dispatch(removeFromCart(item.fruit._id))}
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                      title="Remove from cart"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    ৳{item.fruit.offer_price.toFixed(2)} ×{" "}
                    {item.ordered_quantity} {item.fruit.unit}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.fruit._id))}
                      disabled={item.ordered_quantity <= 1}
                      className="bg-gray-200 text-gray-800 p-1 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-medium">{item.ordered_quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.fruit._id))}
                      className="bg-gray-200 text-gray-800 p-1 rounded hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="text-sm font-medium">
                    Total: ৳
                    {(
                      (item.ordered_quantity * item.fruit.offer_price) /
                      item.fruit.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-4 text-lg font-semibold">
              <span>Total:</span>
              <span>৳{total.toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <SheetClose asChild className="w-1/2">
                <button
                  className=" bg-[#27d15e] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
                  onClick={() => handleOrder(items)}
                >
                  Checkout
                </button>
              </SheetClose>

              <button
                onClick={() => dispatch(clearCart())}
                className="w-1/2 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FloatingCartButton;
