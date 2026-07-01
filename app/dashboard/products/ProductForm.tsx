"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    hsnCode: "",
    unit: "PCS",
    price: "",
    gstRate: "18",
    stock: "0",
    categoryId: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        gstRate: Number(form.gstRate),
        stock: Number(form.stock),
      }),
    });

    if (res.ok) {
      alert("Product Added Successfully");
      router.push("/dashboard/products");
    } else {
      alert("Failed to add product");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-4"
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="HSN Code"
        value={form.hsnCode}
        onChange={(e) =>
          setForm({ ...form, hsnCode: e.target.value })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Unit"
        value={form.unit}
        onChange={(e) =>
          setForm({ ...form, unit: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="GST %"
        value={form.gstRate}
        onChange={(e) =>
          setForm({ ...form, gstRate: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Opening Stock"
        value={form.stock}
        onChange={(e) =>
          setForm({ ...form, stock: e.target.value })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Category ID"
        value={form.categoryId}
        onChange={(e) =>
          setForm({ ...form, categoryId: e.target.value })
        }
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save Product
      </button>
    </form>
  );
}