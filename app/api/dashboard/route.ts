import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.count();
  const products = await prisma.product.count();
  const suppliers = await prisma.supplier.count();
  const salesInvoices = await prisma.salesInvoice.count();
  const purchaseInvoices = await prisma.purchaseInvoice.count();

  return NextResponse.json({
    customers,
    products,
    suppliers,
    salesInvoices,
    purchaseInvoices,
  });
}