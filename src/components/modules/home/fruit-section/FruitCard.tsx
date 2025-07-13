import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { addToOrder } from "@/redux/features/orders/ordersSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IFruit } from "@/types/fruit/fruit";
import { ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FruitCard = ({ fruit }: { fruit: IFruit }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleOrder = (fruit: IFruit) => {
    dispatch(addToOrder(fruit));
    router.push("/order");
  };
  return (
    <Card>
      <CardHeader>
        <Link href={`/fruits/${fruit?._id}`}>
          <Image
            src={fruit?.image}
            alt={fruit?.name}
            width={400}
            height={400}
            className="w-full h-[300px] object-cover rounded-lg hover:scale-105 duration-300 overflow-hidden"
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="-mt-4">
        <Link href={`/fruits/${fruit?._id}`}>
          <p className="text-lg font-medium">{fruit?.name}</p>
          <div>
            <p>
              <span className="line-through pr-1">{fruit?.regular_price}</span>
              <span className="font-medium">{fruit?.offer_price}৳ </span>
              <span className="text-sm">
                / {fruit?.quantity} {fruit?.unit}
              </span>
            </p>
          </div>
          <p className="text-gray-400 pt-2">
            {fruit?.description?.slice(0, 100)}...
          </p>
        </Link>
      </CardContent>

      <CardFooter className="space-x-2 mt-auto">
        <Button
          className="w-1/2 cursor-pointer"
          variant={"outline"}
          onClick={() => dispatch(addToCart(fruit))}
        >
          Add To Cart{" "}
          <ShoppingCart size={28} color="#27d15e" strokeWidth={2.5} />
        </Button>
        <Button
          className="w-1/2 cursor-pointer"
          onClick={() => handleOrder(fruit)}
        >
          Buy Now <Zap size={28} strokeWidth={2.5} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FruitCard;
