import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// =========================
// GET SINGLE PRODUCT
// =========================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE PRODUCT
// =========================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      name,
      hsnCode,
      unit,
      price,
      gstRate,
      stock,
      categoryId,
    } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        hsnCode,
        unit,
        price: Number(price),
        gstRate: Number(gstRate),
        stock: Number(stock),
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 }
    );
  }
}

// =========================
// DELETE PRODUCT
// =========================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 }
    );
  }
}