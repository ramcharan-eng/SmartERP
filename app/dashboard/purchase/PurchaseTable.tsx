"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Purchase {
  id: string;
  invoiceNumber: string;
  supplier: {
    name: string;
  };
  date: string;
  grandTotal: number;
}

export default function PurchaseTable() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    loadPurchases();
  }, []);

  async function loadPurchases() {
    const res = await fetch("/api/purchase");
    const data = await res.json();
    setPurchases(data);
  }

  async function deletePurchase(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this purchase?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/purchase/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Purchase Deleted Successfully");
      loadPurchases();
    } else {
      alert("Failed to delete purchase");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Invoice No</th>
            <th className="text-left p-3">Supplier</th>
            <th className="text-left p-3">Date</th>
            <th className="text-left p-3">Grand Total</th>
            <th className="text-center p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {purchases.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center py-6 text-gray-500"
              >
                No Purchase Records Found
              </td>
            </tr>
          ) : (
            purchases.map((purchase) => (
              <tr
                key={purchase.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3">{purchase.invoiceNumber}</td>

                <td className="p-3">{purchase.supplier?.name}</td>

                <td className="p-3">
                  {new Date(purchase.date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  ₹ {purchase.grandTotal.toFixed(2)}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/dashboard/purchase/edit/${purchase.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deletePurchase(purchase.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}