// app/api/userinput/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  // Obtém a sessão do usuário via Kinde
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  try {
    // 1. Parseia o corpo da requisição para extrair os valores enviados
    const { field1, field2, field3, field4, field5 } = await request.json();

    // 2. Captura o userId e o email do usuário autenticado
    const userId = user.id;
    const email = user.email!;

    // 3. Utiliza o método upsert para atualizar o registro se ele já existir ou criar um novo
    const record = await prisma.userData.upsert({
      where: { userId }, // Procura pelo registro que tenha o mesmo userId
      update: {
        email,     // Atualiza o e-mail (caso seja necessário)
        field1,
        field2,
        field3,
        field4,
        field5,
      },
      create: {
        userId,
        email,
        field1,
        field2,
        field3,
        field4,
        field5,
      },
    });

    // 4. Retorna a resposta com o registro criado/atualizado
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Erro ao inserir na base de dados:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
