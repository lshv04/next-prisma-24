// app/api/submission/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {

    const { getUser } = getKindeServerSession();
    const user = await getUser();



  try {
    // Parseia o corpo da requisição (assumindo que ele está em JSON)
    const { option } = await request.json();

  
    const userId = user.id;

    const submission = await prisma.submission.create({
      data: {
        userId,
        option,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar submission:', error);
    return NextResponse.json(
      { message: 'Erro interno no servidor.' },
      { status: 500 }
    );
  }
}
