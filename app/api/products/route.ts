import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ==========================
// GET ALL PRODUCTS
// ==========================
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Error fetching products",
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================
// CREATE PRODUCT
// ==========================
export async function POST(req: NextRequest) {
  try {
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

    // Validation
    if (!name || !price || !categoryId) {
      return NextResponse.json(
        {
          message: "Name, Price and Category are required",
        },
        {
          status: 400,
        }
      );
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          message: "Category not found",
        },
        {
          status: 404,
        }
      );
    }

    // Create Product
    const product = await prisma.product.create({
      data: {
        name,
        hsnCode,
        unit: unit || "PCS",
        price: Number(price),
        gstRate: Number(gstRate ?? 18),
        stock: Number(stock ?? 0),
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}