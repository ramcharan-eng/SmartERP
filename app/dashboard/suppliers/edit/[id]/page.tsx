"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditSupplier() {
  const params = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    async function loadSupplier() {
      const res = await fetch(`/api/suppliers/${params.id}`);
      const data = await res.json();

      setForm({
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        gstNumber: data.gstNumber || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        pincode: data.pincode || "",
      });
    }

    loadSupplier();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/suppliers/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Supplier Updated Successfully");
    router.push("/dashboard/suppliers");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Supplier</h1>

      <form onSubmit={updateSupplier} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Supplier Name"
          className="w-full border rounded p-2"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border rounded p-2"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded p-2"
        />

        <input
          name="gstNumber"
          value={form.gstNumber}
          onChange={handleChange}
          placeholder="GST Number"
          className="w-full border rounded p-2"
        />

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border rounded p-2"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border rounded p-2"
        />

        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full border rounded p-2"
        />

        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="w-full border rounded p-2"
        />

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded"
          type="submit"
        >
          Update Supplier
        </button>
      </form>
    </div>
  );
}