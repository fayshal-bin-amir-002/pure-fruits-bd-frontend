import MyOrdersManagement from "@/components/modules/my-orders/MyOrdersManagement";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Suspense } from "react";

const MyOrdersPage = () => {
  return (
    <div className="my-4 md:my-6">
      <Suspense fallback={<LoadingSpinner />}>
        <MyOrdersManagement />
      </Suspense>
    </div>
  );
};

export default MyOrdersPage;
