"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
}

export default function ProductForm() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name: "",
    hsnCode: "",
    unit: "PCS",
    price: "",
    gstRate: "18",
    stock: "0",
    categoryId: "",
  });

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }

    loadCategories();
  }, []);

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

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      router.push("/dashboard/products");
    } else {
      alert(data.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-4"
    >
      <input
        placeholder="Product Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="HSN Code"
        className="w-full border p-2 rounded"
        value={form.hsnCode}
        onChange={(e) =>
          setForm({ ...form, hsnCode: e.target.value })
        }
      />

      <input
        placeholder="Unit"
        className="w-full border p-2 rounded"
        value={form.unit}
        onChange={(e) =>
          setForm({ ...form, unit: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Price"
        className="w-full border p-2 rounded"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="GST %"
        className="w-full border p-2 rounded"
        value={form.gstRate}
        onChange={(e) =>
          setForm({ ...form, gstRate: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Opening Stock"
        className="w-full border p-2 rounded"
        value={form.stock}
        onChange={(e) =>
          setForm({ ...form, stock: e.target.value })
        }
      />

      <select
        className="w-full border p-2 rounded"
        value={form.categoryId}
        onChange={(e) =>
          setForm({
            ...form,
            categoryId: e.target.value,
          })
        }
      >
        <option value="">Select Category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save Product
      </button>
    </form>
  );
}