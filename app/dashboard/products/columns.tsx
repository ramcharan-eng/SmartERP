"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export type Product = {
  id: string;
  name: string;
  hsnCode: string;
  unit: string;
  price: number;
  gstRate: number;
  stock: number;
  category: {
    id: string;
    name: string;
  };
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span>₹ {row.original.price.toFixed(2)}</span>
    ),
  },
  {
    accessorKey: "gstRate",
    header: "GST %",
    cell: ({ row }) => (
      <span>{row.original.gstRate}%</span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Edit
        </Button>

        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
];