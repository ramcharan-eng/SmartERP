import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalCustomers = await prisma.customer.count();

    const totalSuppliers = await prisma.supplier.count();

    const totalProducts = await prisma.product.count();

    const totalPurchaseInvoices = await prisma.purchaseInvoice.count();

    const totalSalesInvoices = await prisma.salesInvoice.count();

    const purchaseInvoices = await prisma.purchaseInvoice.findMany({
      select: {
        grandTotal: true,
      },
    });

    const salesInvoices = await prisma.salesInvoice.findMany({
      select: {
        grandTotal: true,
      },
    });

    const totalPurchaseAmount = purchaseInvoices.reduce(
      (sum, invoice) => sum + invoice.grandTotal,
      0
    );

    const totalSalesAmount = salesInvoices.reduce(
      (sum, invoice) => sum + invoice.grandTotal,
      0
    );

    return NextResponse.json({
      totalCustomers,
      totalSuppliers,
      totalProducts,
      totalPurchaseInvoices,
      totalSalesInvoices,
      totalPurchaseAmount,
      totalSalesAmount,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to load reports" },
      { status: 500 }
    );
  }
}