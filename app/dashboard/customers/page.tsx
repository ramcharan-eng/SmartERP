"use client";

import Link from "next/link";
import CustomersTable from "./CustomersTable";

export default function CustomersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>

        <Link
          href="/dashboard/customers/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Customer
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search Customer..."
        className="border p-2 rounded-lg w-72 mb-5"
      />

      <CustomersTable />
    </div>
  );
}