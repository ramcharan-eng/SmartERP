"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
  gstNumber: string;
  city: string;
  state: string;
}

export default function SuppliersTable() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    try {
      const res = await fetch("/api/suppliers");

      if (!res.ok) {
        throw new Error("Failed to fetch suppliers");
      }

      const data = await res.json();
      setSuppliers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/suppliers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));

      alert("Supplier Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete supplier");
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">GST Number</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">State</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6">
                No Suppliers Found
              </td>
            </tr>
          ) : (
            suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{supplier.name}</td>
                <td className="p-3">{supplier.phone}</td>
                <td className="p-3">{supplier.email}</td>
                <td className="p-3">{supplier.gstNumber}</td>
                <td className="p-3">{supplier.city}</td>
                <td className="p-3">{supplier.state}</td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/dashboard/suppliers/edit/${supplier.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(supplier.id)}
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