// app/api/userinput/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 1. Parseia o corpo da requisição para extrair o valor enviado
    const { userText } = await request.json();

    // 2. Aqui você pode capturar o userId e email do usuário autenticado.
    // Por enquanto, usamos valores fixos para fins de teste.
    const userId = "dummy-user-id"; // Substitua pela lógica de autenticação
    const email = "dummy@email.com"; // Substitua ou capture o e-mail real do usuário

    // 3. Cria um novo registro na base de dados usando o modelo UserData.
    // O valor recebido é armazenado em 'field1'
    const record = await prisma.userData.create({
      data: {
        userId,
        email,
        field1: userText,  // Armazena o valor submetido em field1
        // Os demais campos (field2, field3, field4, field5) podem ficar vazios ou ser preenchidos conforme sua lógica
      },
    });

    // 4. Retorna a resposta com o registro criado
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Erro ao inserir na base de dados:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
