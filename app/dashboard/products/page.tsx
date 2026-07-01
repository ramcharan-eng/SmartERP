"use client";

import Link from "next/link";
import ProductTable from "./ProductTable";

export default function ProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          href="/dashboard/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search Product..."
        className="border p-2 rounded-lg w-72 mb-5"
      />

      <ProductTable />
    </div>
  );
}