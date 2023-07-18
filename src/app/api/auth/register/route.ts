import { prisma } from "../../../../../prisma/prisma";
import { User, Storage } from "@prisma/client";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  const { name, username, password }: User = await req.json()
  try {
    if (await prisma.user.findUnique({
      where: {
        username
      }
    })) {
      return NextResponse.json({ error: "User already exists!" }, { status: 422 })
    }
    const storage = await prisma.storage.create({})
    const pswd = await hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: pswd,
        storageId: storage.id
      }
    })
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}