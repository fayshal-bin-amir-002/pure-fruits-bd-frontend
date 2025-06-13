import FruitsManagement from "@/components/modules/dashboard/fruits";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Suspense } from "react";

const FruitsPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <FruitsManagement />
      </Suspense>
    </div>
  );
};

export default FruitsPage;
