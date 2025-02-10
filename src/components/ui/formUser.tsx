// pages/services.tsx
"use client"
import type { NextPage } from "next";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const FormUser: NextPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validação simples: se nenhuma opção for selecionada, não envia
    if (!selectedOption) {
      setFeedback("Por favor, selecione uma opção.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch("/api/submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ option: selectedOption }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao enviar a submissão.");
      }

      setFeedback("Submissão enviada com sucesso!");
      // Opcional: limpar a seleção após o envio
      setSelectedOption("");
    } catch (error: any) {
      console.error("Erro no submit:", error);
      setFeedback("Falha ao enviar a submissão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <Select
          // Supondo que o componente Select tenha a prop `onValueChange`
          // que retorna o valor selecionado. Caso contrário, adapte conforme sua implementação.
          onValueChange={(value: string) => setSelectedOption(value)}
          value={selectedOption}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Favorite color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="yellow">Yellow</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="pink">Pink</SelectItem>
            <SelectItem value="brown">Brown</SelectItem>
            <SelectItem value="black">Black</SelectItem>
            <SelectItem value="white">White</SelectItem>
          </SelectContent>
        </Select>

       
        <Button
        variant="default"
          type="submit"
          disabled={loading}
          className="mt-4 px-4 py-2"
        >
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
      
      {feedback && <p className="mt-2">{feedback}</p>}
    </main>
  );
};

export default FormUser;
