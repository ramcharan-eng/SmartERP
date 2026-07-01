"use client";

import Link from "next/link";
import SuppliersTable from "./SuppliersTable";

export default function SuppliersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Suppliers</h1>

        <Link
          href="/dashboard/suppliers/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Supplier
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search Supplier..."
        className="border p-2 rounded-lg w-72 mb-5"
      />

      <SuppliersTable />
    </div>
  );
}