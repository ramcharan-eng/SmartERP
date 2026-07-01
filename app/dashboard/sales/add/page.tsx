"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Customer {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  gstRate: number;
}

export default function AddSalesPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
    rate: 0,
    gstRate: 18,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [customerRes, productRes] = await Promise.all([
        fetch("/api/customers"),
        fetch("/api/products"),
      ]);

      const customerData = await customerRes.json();
      const productData = await productRes.json();

      setCustomers(customerData);
      setProducts(productData);

      if (productData.length > 0) {
        setForm((prev) => ({
          ...prev,
          productId: productData[0].id,
          rate: productData[0].price,
          gstRate: productData[0].gstRate,
        }));
      }

      if (customerData.length > 0) {
        setForm((prev) => ({
          ...prev,
          customerId: customerData[0].id,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const subtotal = form.quantity * form.rate;
  const gst = subtotal * form.gstRate / 100;
  const grandTotal = subtotal + gst;

  async function saveSale(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        subtotal,
        cgstTotal: gst / 2,
        sgstTotal: gst / 2,
        igstTotal: 0,
        grandTotal,
      }),
    });

    if (res.ok) {
      alert("Sales Invoice Created");
      router.push("/dashboard/sales");
    } else {
      alert("Failed to create invoice");
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">
        Add Sales Invoice
      </h1>

      <form onSubmit={saveSale} className="space-y-4">

        <select
          className="w-full border rounded p-2"
          value={form.customerId}
          onChange={(e) =>
            setForm({
              ...form,
              customerId: e.target.value,
            })
          }
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <select
          className="w-full border rounded p-2"
          value={form.productId}
          onChange={(e) => {
            const product = products.find(
              (p) => p.id === e.target.value
            );

            if (!product) return;

            setForm({
              ...form,
              productId: product.id,
              rate: product.price,
              gstRate: product.gstRate,
            });
          }}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="w-full border rounded p-2"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          className="w-full border rounded p-2"
          placeholder="Rate"
          value={form.rate}
          onChange={(e) =>
            setForm({
              ...form,
              rate: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          className="w-full border rounded p-2"
          placeholder="GST %"
          value={form.gstRate}
          onChange={(e) =>
            setForm({
              ...form,
              gstRate: Number(e.target.value),
            })
          }
        />

        <div className="bg-gray-100 rounded-lg p-4">
          <p>
            <strong>Subtotal:</strong> ₹ {subtotal.toFixed(2)}
          </p>

          <p>
            <strong>GST:</strong> ₹ {gst.toFixed(2)}
          </p>

          <p className="text-xl font-bold mt-2">
            Grand Total : ₹ {grandTotal.toFixed(2)}
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Save Sales Invoice
        </button>

      </form>
    </div>
  );
}