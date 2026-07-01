"use client";

import Link from "next/link";
import SalesTable from "./SalesTable";

export default function SalesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales Invoices</h1>

        <Link
          href="/dashboard/sales/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Sales
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search Sales..."
        className="border p-2 rounded-lg w-72 mb-5"
      />

      <SalesTable />
    </div>
  );
}