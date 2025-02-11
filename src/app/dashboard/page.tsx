// pages/dashboard.tsx
import type { NextPage } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Dashboard: NextPage = async () => {
  // Obtém a sessão do usuário via Kinde
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isUserAuthenticated = await isAuthenticated();

  // Variável para armazenar os dados do registro do usuário na base
  let userData = null;

  if (isUserAuthenticated && user?.id) {
    // Consulta o registro do usuário usando o Prisma
    userData = await prisma.userData.findUnique({
      where: { userId: user.id },
    });
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {isUserAuthenticated ? (
        <div>
          <h2>Informações do usuário autenticado:</h2>
          <p>Email: {user.email}</p>
          <p>
            Nome: {user.given_name} {user.family_name}
          </p>

          {userData ? (
            <div className="mt-4">
              <h3>Dados do Registro do Usuário</h3>
              <p>Field1: {userData.field1}</p>
              <p>Field2: {userData.field2 ?? "Não definido"}</p>
              <p>Field3: {userData.field3 ?? "Não definido"}</p>
              <p>Field4: {userData.field4 ?? "Não definido"}</p>
              <p>Field5: {userData.field5 ?? "Não definido"}</p>
            </div>
          ) : (
            <p className="mt-4">Nenhum dado encontrado no banco de dados para este usuário.</p>
          )}
        </div>
      ) : (
        <p>Usuário não autenticado</p>
      )}
    </main>
  );
};

export default Dashboard;
