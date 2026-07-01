"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Supplier {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  gstRate: number;
}

export default function AddPurchasePage() {
  const router = useRouter();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState({
    supplierId: "",
    productId: "",
    quantity: 1,
    rate: 0,
    gstRate: 18,
  });

  useEffect(() => {
    loadSuppliers();
    loadProducts();
  }, []);

  async function loadSuppliers() {
    const res = await fetch("/api/suppliers");
    const data = await res.json();
    setSuppliers(data);
  }

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  const total = form.quantity * form.rate;
  const gst = (total * form.gstRate) / 100;
  const grandTotal = total + gst;

  async function savePurchase(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        subtotal: total,
        cgstTotal: gst / 2,
        sgstTotal: gst / 2,
        igstTotal: 0,
        grandTotal,
      }),
    });

    if (res.ok) {
      alert("Purchase Saved Successfully");
      router.push("/dashboard/purchase");
    } else {
      alert("Failed");
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">

      <h1 className="text-2xl font-bold mb-6">
        Add Purchase Invoice
      </h1>

      <form onSubmit={savePurchase} className="space-y-4">

        <select
          className="w-full border rounded p-2"
          value={form.supplierId}
          onChange={(e) =>
            setForm({ ...form, supplierId: e.target.value })
          }
        >
          <option>Select Supplier</option>

          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
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
          <option>Select Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          className="w-full border rounded p-2"
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
          placeholder="Rate"
          className="w-full border rounded p-2"
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
          placeholder="GST %"
          className="w-full border rounded p-2"
          value={form.gstRate}
          onChange={(e) =>
            setForm({
              ...form,
              gstRate: Number(e.target.value),
            })
          }
        />

        <div className="border rounded-lg p-4 bg-gray-50">

          <p>Subtotal : ₹ {total.toFixed(2)}</p>

          <p>GST : ₹ {gst.toFixed(2)}</p>

          <p className="font-bold text-lg">
            Grand Total : ₹ {grandTotal.toFixed(2)}
          </p>

        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Save Purchase
        </button>

      </form>
    </div>
  );
}