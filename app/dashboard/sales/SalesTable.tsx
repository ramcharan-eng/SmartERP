"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Sale {
  id: string;
  invoiceNumber: string;
  grandTotal: number;
  createdAt: string;
  customer: {
    name: string;
  };
}

export default function SalesTable() {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    fetchSales();
  }, []);

  async function fetchSales() {
    const res = await fetch("/api/sales");
    const data = await res.json();
    setSales(data);
  }

  async function deleteSale(id: string) {
    if (!confirm("Delete this invoice?")) return;

    const res = await fetch(`/api/sales/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchSales();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Invoice</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Grand Total</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-5">
                No Sales Found
              </td>
            </tr>
          ) : (
            sales.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td className="p-3">{sale.invoiceNumber}</td>
                <td className="p-3">{sale.customer?.name}</td>
                <td className="p-3">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">₹ {sale.grandTotal}</td>
                <td className="p-3 flex gap-2">
                  <Link
                    href={`/dashboard/sales/edit/${sale.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteSale(sale.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}