"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns, Product } from "./columns";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <DataTable columns={columns} data={products} />
    </div>
  );
}