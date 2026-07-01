"use client";

import ProductForm from "../ProductForm";

export default function AddProductPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <ProductForm />
    </div>
  );
}