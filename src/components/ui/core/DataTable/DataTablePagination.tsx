"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../button";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const DataTablePagination = ({ totalPage }: { totalPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3 my-6 justify-end">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            router.push(`${pathname}?page=${currentPage - 1}`);
          }
        }}
      >
        <ArrowLeft />
      </Button>
      {[...Array(totalPage)].map((_, i) => (
        <Button
          variant={currentPage === i + 1 ? "default" : "outline"}
          key={i}
          onClick={() => {
            setCurrentPage(i + 1);
            router.push(`${pathname}?page=${i + 1}`);
          }}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            router.push(`${pathname}?page=${currentPage + 1}`);
          }
        }}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default DataTablePagination;
