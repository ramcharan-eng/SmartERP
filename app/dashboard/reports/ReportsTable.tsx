"use client";

import { useEffect, useState } from "react";

interface Report {
  totalCustomers: number;
  totalSuppliers: number;
  totalProducts: number;
  totalPurchaseInvoices: number;
  totalSalesInvoices: number;
  totalPurchaseAmount: number;
  totalSalesAmount: number;
}

export default function ReportsTable() {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    const res = await fetch("/api/reports");
    const data = await res.json();
    setReport(data);
  }

  if (!report) {
    return (
      <div className="text-center p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-gray-500">Customers</h2>
        <p className="text-3xl font-bold">
          {report.totalCustomers}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-gray-500">Suppliers</h2>
        <p className="text-3xl font-bold">
          {report.totalSuppliers}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-gray-500">Products</h2>
        <p className="text-3xl font-bold">
          {report.totalProducts}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-gray-500">Purchase Invoices</h2>
        <p className="text-3xl font-bold">
          {report.totalPurchaseInvoices}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-gray-500">Sales Invoices</h2>
        <p className="text-3xl font-bold">
          {report.totalSalesInvoices}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-gray-500">Purchase Amount</h2>
        <p className="text-3xl font-bold text-red-600">
          ₹ {report.totalPurchaseAmount.toFixed(2)}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-gray-500">Sales Amount</h2>
        <p className="text-3xl font-bold text-green-600">
          ₹ {report.totalSalesAmount.toFixed(2)}
        </p>
      </div>

    </div>
  );
}