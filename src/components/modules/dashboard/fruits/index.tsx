"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/core/DataTable";
import DataTablePagination from "@/components/ui/core/DataTable/DataTablePagination";
import TableSkeleton from "@/components/ui/core/Loader/TableSkeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useDeleteFruitMutation,
  useGetAllFruitQuery,
} from "@/redux/features/fruits/fruitsApi";
import { IFruitCategory } from "@/types/fruit-category";
import { IFruit } from "@/types/fruit/fruit";
import { IMeta } from "@/types/meta";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import ViewFruitModal from "./ViewFruitModal";
import AddFruitModal from "./AddFruitModal";
import UpdateFruitModal from "./UpdateFruitModal";

const FruitManagement = () => {
  const [isViewFruitModalOpen, setIsViewFruitModalOpen] =
    useState<boolean>(false);
  const [isAddFruitModalOpen, setIsAddFruitModalOpen] =
    useState<boolean>(false);
  const [isUpdateFruitModalOpen, setIsUpdateFruitModalOpen] =
    useState<boolean>(false);
  const [selectedFruit, setSelectedFruit] = useState<IFruit | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsObj: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const removeSearchQuery = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(query);

    const newQuery = params.toString();
    const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;

    router.push(newUrl, { scroll: false });
  };

  const [deleteFruit] = useDeleteFruitMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You wanna delete this category!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteFruit(id).unwrap();
          if (res?.success) {
            toast.success(res?.message);
          } else {
            toast.error(res?.message || "Something went wrong!");
          }
        } catch (err: any) {
          toast.error(err?.data?.message || "Something went wrong!");
        }
      }
    });
  };

  const { data, isLoading, isFetching } = useGetAllFruitQuery(paramsObj);
  const fruits: IFruit[] = data?.data || [];
  const meta: IMeta = data?.meta || {};

  const columns: ColumnDef<IFruit>[] = [
    {
      accessorKey: "image",
      header: () => <div>Image</div>,
      cell: ({ row }) => (
        <div>
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={100}
            height={100}
            className="w-[50px]"
            priority
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => <span className="truncate">{row.original.name}</span>,
    },
    {
      accessorKey: "regular_price",
      header: () => <div>Regular Price</div>,
      cell: ({ row }) => (
        <span className="truncate">{row.original.regular_price}</span>
      ),
    },
    {
      accessorKey: "offer_price",
      header: () => <div>Offer Price</div>,
      cell: ({ row }) => (
        <span className="truncate">{row.original.offer_price}</span>
      ),
    },
    {
      accessorKey: "inStock",
      header: () => <div>inStock</div>,
      cell: ({ row }) => (
        <span
          className={`${
            row.original.inStock ? "text-primary" : "text-red-500"
          }`}
        >
          {row.original.inStock ? "Yes" : "No"}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div>Actions</div>,
      cell: ({ row }) => (
        <div className="space-x-2">
          <Button
            variant={"outline"}
            size={"icon"}
            className="cursor-pointer"
            onClick={() => {
              setIsViewFruitModalOpen(true);
              setSelectedFruit(row.original);
            }}
          >
            <Eye size={28} color="#27d15e" strokeWidth={2.5} />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="cursor-pointer"
            onClick={() => {
              setIsUpdateFruitModalOpen(true);
              setSelectedFruit(row.original);
            }}
          >
            <Pencil size={28} color="#27d15e" strokeWidth={2.5} />
          </Button>
          <Button
            variant={"outline"}
            size={"icon"}
            className="cursor-pointer"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash size={28} color="#27d15e" strokeWidth={2.5} />
          </Button>
        </div>
      ),
    },
  ];

  const form = useForm({
    defaultValues: {
      search_field: "",
    },
  });

  const handleSearch = async (data: { search_field: string }) => {
    if (data?.search_field.trim() !== "") {
      handleSearchQuery("searchTerm", data?.search_field);
    } else {
      removeSearchQuery("searchTerm");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:justify-between">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            className="flex items-center gap-2"
          >
            <FormField
              control={form.control}
              name="search_field"
              render={({ field }) => (
                <FormItem className="w-[250px]">
                  <FormControl>
                    <Input {...field} placeholder="Search..." type="search" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                type="submit"
                className="cursor-pointer"
                variant={"outline"}
              >
                Search
              </Button>
            </div>
          </form>
        </Form>
        <Button
          onClick={() => setIsAddFruitModalOpen(true)}
          className="cursor-pointer"
        >
          Add Fruit Item <Plus size={28} strokeWidth={2.5} />
        </Button>
      </div>
      <div className="mb-6">
        {isLoading || isFetching ? (
          <TableSkeleton />
        ) : (
          <DataTable data={fruits} columns={columns} />
        )}
      </div>
      {!isLoading && fruits?.length > 0 && (
        <div className="flex justify-center">
          <DataTablePagination totalPage={meta?.totalPage || 1} />
        </div>
      )}
      <ViewFruitModal
        fruit={selectedFruit}
        isOpen={isViewFruitModalOpen}
        onOpenChange={setIsViewFruitModalOpen}
      />
      <AddFruitModal
        isOpen={isAddFruitModalOpen}
        onOpenChange={setIsAddFruitModalOpen}
      />
      <UpdateFruitModal
        fruit={selectedFruit}
        isOpen={isUpdateFruitModalOpen}
        onOpenChange={setIsUpdateFruitModalOpen}
      />
    </div>
  );
};

export default FruitManagement;
