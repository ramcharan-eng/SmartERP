"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function EditPurchasePage() {
  const router = useRouter();
  const params = useParams();

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
    loadData();
  }, []);

  async function loadData() {
    try {
      const [supplierRes, productRes, purchaseRes] = await Promise.all([
        fetch("/api/suppliers"),
        fetch("/api/products"),
        fetch(`/api/purchase/${params.id}`),
      ]);

      const supplierData = await supplierRes.json();
      const productData = await productRes.json();
      const purchase = await purchaseRes.json();

      setSuppliers(supplierData);
      setProducts(productData);

      setForm({
        supplierId: purchase.supplierId,
        productId: purchase.items[0].productId,
        quantity: purchase.items[0].quantity,
        rate: purchase.items[0].rate,
        gstRate: purchase.items[0].gstRate,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const subtotal = form.quantity * form.rate;
  const gst = subtotal * form.gstRate / 100;

  async function updatePurchase(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/purchase/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        subtotal,
        cgstTotal: gst / 2,
        sgstTotal: gst / 2,
        igstTotal: 0,
        grandTotal: subtotal + gst,
      }),
    });

    if (res.ok) {
      alert("Purchase Updated Successfully");
      router.push("/dashboard/purchase");
    } else {
      alert("Failed to update purchase");
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">
        Edit Purchase
      </h1>

      <form onSubmit={updatePurchase} className="space-y-4">

        <select
          className="w-full border rounded p-2"
          value={form.supplierId}
          onChange={(e) =>
            setForm({
              ...form,
              supplierId: e.target.value,
            })
          }
        >
          {suppliers.map((supplier) => (
            <option
              key={supplier.id}
              value={supplier.id}
            >
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
          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
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

        <div className="bg-gray-100 rounded p-4">
          <p>
            <strong>Subtotal:</strong> ₹ {subtotal.toFixed(2)}
          </p>

          <p>
            <strong>GST:</strong> ₹ {gst.toFixed(2)}
          </p>

          <p className="text-lg font-bold">
            Grand Total: ₹ {(subtotal + gst).toFixed(2)}
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Update Purchase
        </button>

      </form>
    </div>
  );
}