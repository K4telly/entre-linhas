// Esboço inicial do "Entre Linhas"
// Página com 1 pergunta por vez, estilo fofo e responsivo

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const perguntas = [
  {
    id: 1,
    texto: "Quando você se sente mais você mesma?",
    tipo: "texto",
  },
  {
    id: 2,
    texto: "Escolha uma estação do ano que combina com você:",
    tipo: "opcoes",
    opcoes: ["Primavera 🌸", "Verão ☀️", "Outono 🍂", "Inverno ❄️"],
  },
  {
    id: 3,
    texto: "Se pudesse escolher um lugar pra se esconder do mundo, como seria?",
    tipo: "texto",
  },
];

export default function EntreLinhas() {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState({});
  const perguntaAtual = perguntas[indice];

  function handleResposta(resposta) {
    setRespostas((prev) => ({ ...prev, [perguntaAtual.id]: resposta }));
    if (indice < perguntas.length - 1) {
      setIndice(indice + 1);
    } else {
      console.log("Respostas finais:", respostas); // Aqui vamos integrar com o Firestore depois
      alert("Obrigada por se abrir 💌");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4 text-center">
          <h2 className="text-xl font-semibold text-pink-800">
            {perguntaAtual.texto}
          </h2>

          {perguntaAtual.tipo === "texto" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const resposta = e.target.resposta.value;
                if (resposta.trim()) handleResposta(resposta);
              }}
            >
              <input
                name="resposta"
                type="text"
                placeholder="Sua resposta..."
                className="w-full p-2 border border-pink-300 rounded-xl mt-4"
              />
              <Button className="mt-4 w-full bg-pink-500 hover:bg-pink-600">
                Enviar
              </Button>
            </form>
          )}

          {perguntaAtual.tipo === "opcoes" && (
            <div className="space-y-2">
              {perguntaAtual.opcoes.map((opcao, idx) => (
                <Button
                  key={idx}
                  className="w-full bg-pink-200 hover:bg-pink-300 text-pink-900"
                  onClick={() => handleResposta(opcao)}
                >
                  {opcao}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
