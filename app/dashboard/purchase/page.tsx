"use client";

import Link from "next/link";
import PurchaseTable from "./PurchaseTable";

export default function PurchasePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Purchase Invoices</h1>

        <Link
          href="/dashboard/purchase/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Purchase
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search Purchase..."
        className="border p-2 rounded-lg w-72 mb-5"
      />

      <PurchaseTable />
    </div>
  );
}