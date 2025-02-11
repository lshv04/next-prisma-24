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
    // 1. Parseia o corpo da requisição para extrair os valores enviados.
    // Espera receber um objeto que pode conter alguns ou todos os campos:
    // field1, field2, field3, field4, field5 e opcionalmente email.
    const data = await request.json();

    const userId = user.id;
    const providedEmail = user.email!;

    // 2. Constrói dinamicamente o objeto de atualização, incluindo apenas os campos
    // que foram enviados com informação (não vazios ou undefined).
    const updateData: { [key: string]: string | null } = {};

    // Para field1: se for enviado e não for string vazia, inclui-o. Como é obrigatório na criação,
    // para atualização ele só é alterado se o usuário enviar um novo valor.
    if (data.field1 !== undefined && data.field1.trim() !== "") {
      updateData.field1 = data.field1;
    }
    if (data.field2 !== undefined && data.field2.trim() !== "") {
      updateData.field2 = data.field2;
    }
    if (data.field3 !== undefined && data.field3.trim() !== "") {
      updateData.field3 = data.field3;
    }
    if (data.field4 !== undefined && data.field4.trim() !== "") {
      updateData.field4 = data.field4;
    }
    if (data.field5 !== undefined && data.field5.trim() !== "") {
      updateData.field5 = data.field5;
    }
    if (data.email !== undefined && data.email.trim() !== "") {
      updateData.email = data.email;
    }

    // 3. Se o registro não existe, para criar um novo é necessário que field1 esteja preenchido.
    // Caso contrário, retorne um erro.
    // (Você pode ajustar essa regra conforme a sua lógica de negócio.)
    if (!await prisma.userData.findUnique({ where: { userId } })) {
      if (data.field1 === undefined || data.field1.trim() === "") {
        return NextResponse.json(
          { message: "Para criar um registro, o campo field1 é obrigatório." },
          { status: 400 }
        );
      }
    }

    // 4. Realiza o upsert:
    // - Se o registro já existir, atualiza apenas os campos presentes em updateData.
    // - Se não existir, cria o registro. Nos campos não enviados, usamos null (exceto para field1,
    //   que é obrigatório; se não enviado, já retornamos erro acima).
    const record = await prisma.userData.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        email: updateData.email ?? providedEmail,
        field1: data.field1, // field1 é obrigatório na criação (já validado)
        field2: data.field2 && data.field2.trim() !== "" ? data.field2 : null,
        field3: data.field3 && data.field3.trim() !== "" ? data.field3 : null,
        field4: data.field4 && data.field4.trim() !== "" ? data.field4 : null,
        field5: data.field5 && data.field5.trim() !== "" ? data.field5 : null,
      },
    });

    return NextResponse.json(record, { status: record ? 200 : 201 });
  } catch (error) {
    console.error("Erro ao inserir na base de dados:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
