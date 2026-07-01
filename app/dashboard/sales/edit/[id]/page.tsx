"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function EditSalesPage() {
  const router = useRouter();
  const params = useParams();

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
      const [customerRes, productRes, saleRes] = await Promise.all([
        fetch("/api/customers"),
        fetch("/api/products"),
        fetch(`/api/sales/${params.id}`),
      ]);

      const customerData = await customerRes.json();
      const productData = await productRes.json();
      const sale = await saleRes.json();

      setCustomers(customerData);
      setProducts(productData);

      setForm({
        customerId: sale.customerId,
        productId: sale.items[0].productId,
        quantity: sale.items[0].quantity,
        rate: sale.items[0].rate,
        gstRate: sale.items[0].gstRate,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const subtotal = form.quantity * form.rate;
  const gst = subtotal * form.gstRate / 100;
  const grandTotal = subtotal + gst;

  async function updateSale(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/sales/${params.id}`, {
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
        grandTotal,
      }),
    });

    if (res.ok) {
      alert("Sales Invoice Updated Successfully");
      router.push("/dashboard/sales");
    } else {
      alert("Failed to update");
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">
        Edit Sales Invoice
      </h1>

      <form onSubmit={updateSale} className="space-y-4">

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
            <option
              key={customer.id}
              value={customer.id}
            >
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
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: Number(e.target.value),
            })
          }
          placeholder="Quantity"
        />

        <input
          type="number"
          className="w-full border rounded p-2"
          value={form.rate}
          onChange={(e) =>
            setForm({
              ...form,
              rate: Number(e.target.value),
            })
          }
          placeholder="Rate"
        />

        <input
          type="number"
          className="w-full border rounded p-2"
          value={form.gstRate}
          onChange={(e) =>
            setForm({
              ...form,
              gstRate: Number(e.target.value),
            })
          }
          placeholder="GST %"
        />

        <div className="bg-gray-100 p-4 rounded">
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
          Update Sales Invoice
        </button>

      </form>
    </div>
  );
}