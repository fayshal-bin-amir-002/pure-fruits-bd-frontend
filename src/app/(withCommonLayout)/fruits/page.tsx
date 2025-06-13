import AllFruitsManagement from "@/components/modules/fruits/AllFruitsManagement";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Suspense } from "react";

const AllFriutsPage = () => {
  return (
    <div className="my-4 md:my-6">
      <Suspense fallback={<LoadingSpinner />}>
        <AllFruitsManagement />
      </Suspense>
    </div>
  );
};

export default AllFriutsPage;
