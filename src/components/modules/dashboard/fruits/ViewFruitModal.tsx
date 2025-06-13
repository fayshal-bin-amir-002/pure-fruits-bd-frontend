import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IFruit } from "@/types/fruit/fruit";
import Image from "next/image";

interface ViewFruitModalProps {
  fruit: IFruit | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const ViewFruitModal: React.FC<ViewFruitModalProps> = ({
  fruit,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="inline-block w-full max-w-2xl p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{fruit?.name}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={fruit?.image as string}
                alt={fruit?.name as string}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Description:</span>{" "}
                {fruit?.description}
              </p>
              <p>
                <span className="font-medium">Regular Price:</span> ৳
                {fruit?.regular_price}
              </p>
              <p>
                <span className="font-medium">Offer Price:</span> ৳
                {fruit?.offer_price}
              </p>
              <p>
                <span className="font-medium">In Stock:</span>{" "}
                {fruit?.inStock ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-medium">Unit:</span> {fruit?.unit}
              </p>
              <p>
                <span className="font-medium">Quantity:</span> {fruit?.quantity}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {fruit?.category?.name}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewFruitModal;
