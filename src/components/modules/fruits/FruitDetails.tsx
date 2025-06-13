"use client";

import Image from "next/image";
import { useGetAFruitQuery } from "@/redux/features/fruits/fruitsApi";
import { IFruit } from "@/types/fruit/fruit";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import FruitDetailsSkeleton from "@/components/ui/core/Loader/FruitDetailsSkeleton";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { addToOrder } from "@/redux/features/orders/ordersSlice";

const FruitDetails = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, isLoading } = useGetAFruitQuery(id, { skip: !id });
  const fruit: IFruit | undefined = data?.data;

  const handleOrder = (fruit: IFruit) => {
    dispatch(addToOrder(fruit));
    router.push("/order");
  };

  if (isLoading || !fruit) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <FruitDetailsSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Image */}
      <div className="w-full h-80 md:h-[450px] relative">
        <Image
          src={fruit.image}
          alt={fruit.name}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold">{fruit.name}</h1>
        <div className="mt-2 text-lg">
          <span className="line-through text-gray-400 pr-2">
            {fruit.regular_price}৳
          </span>
          <span className="text-green-600 font-semibold">
            {fruit.offer_price}৳
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            / {fruit.quantity} {fruit.unit}
          </span>
        </div>
        <p className="mt-4 text-gray-700">{fruit.description}</p>
        <p className="mt-2 text-sm text-gray-500">
          Category: {fruit.category.name}
        </p>
        <p className="text-sm text-gray-500">
          Status:{" "}
          {fruit.inStock ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          className="w-1/2 cursor-pointer"
          variant="outline"
          onClick={() => dispatch(addToCart(fruit))}
        >
          Add to Cart <ShoppingCart className="ml-2" size={20} />
        </Button>
        <Button
          className="w-1/2 cursor-pointer"
          onClick={() => handleOrder(fruit)}
        >
          Buy Now <Zap className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default FruitDetails;
