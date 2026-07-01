"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  gstNo?: string;
  address?: string;
}

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await fetch("/api/customers", {
          cache: "no-store",
        });

        const data = await res.json();

        console.log("Customers:", data);
        console.log("Length:", data.length);

        setCustomers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <p className="mb-4 font-bold">
        Total Customers: {customers.length}
      </p>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">GST</th>
            <th className="border p-2">Address</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.gstNo}</td>
              <td className="border p-2">{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}