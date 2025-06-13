import OrdersManagement from "@/components/modules/dashboard/orders";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Suspense } from "react";

const OrdersPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <OrdersManagement />
      </Suspense>
    </div>
  );
};

export default OrdersPage;
