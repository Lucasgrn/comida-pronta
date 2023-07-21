import { NextResponse } from "next/server";
import { Product } from "@prisma/client";
import { prisma } from "../../../../prisma/prisma";
export async function POST(req: Request) {
  const { name, price, storageId }: Product = await req.json()
  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        storageId
      }
    })
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}