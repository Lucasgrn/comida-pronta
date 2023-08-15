import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { Order, Product, ProductsOnOrders } from "@prisma/client";

export async function POST(req: Request) {
  const { userId, number, clientName, total }: Order = await req.json() // Isso tem que vim do JWT
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        number,
        clientName,
        total
      }
    })
    return NextResponse.json(order, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { userId }: Order = await req.json() // Isso também tem que vim do JWT
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId
      }
    })
    return NextResponse.json(orders, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
