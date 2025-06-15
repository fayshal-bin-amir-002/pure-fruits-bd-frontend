import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IOrder, OrderStatus } from "@/types/order";
import Image from "next/image";

interface ViewMyOrderProps {
  order: IOrder | undefined;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ViewMyOrder: React.FC<ViewMyOrderProps> = ({
  order,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* Customer Info */}
        <div className="space-y-1 border-b pb-4 mb-4">
          <p>
            <span className="font-semibold">Order Id:</span> {order?._id}
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
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                order?.status === OrderStatus.PENDING && "text-amber-500"
              }
                      ${
                        order?.status === OrderStatus.COMPLETE && "text-primary"
                      }
                      ${
                        order?.status === OrderStatus.CANCELED && "text-red-500"
                      }`}
            >
              {order?.status}
            </span>
          </p>
        </div>

        {/* Fruit Items */}
        <div className="space-y-4">
          {order?.fruits?.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center border p-3 rounded-md"
            >
              <Image
                src={item.fruit.image}
                alt={item.fruit.name}
                width={200}
                height={200}
                className="w-20 h-20 object-cover rounded-md"
                priority
              />
              <div className="flex-1">
                <p className="font-semibold text-lg">{item.fruit.name}</p>
                <div className="mt-1 text-sm">
                  <p>
                    Unit Price: ৳{item.fruit.offer_price} /{" "}
                    {item?.fruit?.quantity} {item?.fruit?.unit}
                  </p>
                  {/* <p>Unit Price: ৳{item.fruit.offer_price} / {item?.}</p> */}
                  <p>
                    Quantity: {item.quantity} {item?.fruit?.unit}
                  </p>
                  <p className="font-medium text-green-600">
                    Subtotal: ৳
                    {(item.fruit.offer_price * item.quantity) /
                      item.fruit.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="text-right mt-6 border-t pt-4">
          <p className="text-xl font-bold">
            Total: ৳
            {order?.fruits?.reduce(
              (total, item) =>
                total +
                (item.fruit.offer_price * item.quantity) / item.fruit.quantity,
              0
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMyOrder;
