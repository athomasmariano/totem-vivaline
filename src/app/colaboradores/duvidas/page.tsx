"use client";
import React, { useEffect, useState } from "react";

interface Duvida {
  id?: number;
  pergunta: string;
  resposta: string;
}

const DuvidasCrud = () => {
  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [novaDuvida, setNovaDuvida] = useState<Duvida>({
    pergunta: "",
    resposta: "",
  });

  const [atualizarId, setAtualizarId] = useState("");
  const [duvidaAtualizar, setDuvidaAtualizar] = useState<Duvida>({
    pergunta: "",
    resposta: "",
  });

  const [deletarId, setDeletarId] = useState("");

  const API_URL = "https://api-vivaline.onrender.com/Duvidas";
  const API_KEY = "1234";

  const listarTodos = () => {
    setLoading(true);
    setError(null);
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ao listar: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setDuvidas(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const criarDuvida = () => {
    if (!novaDuvida.pergunta || !novaDuvida.resposta) {
      return alert("Preencha todos os campos para criar");
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(novaDuvida),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Dúvida registrada com sucesso!");
          setNovaDuvida({ pergunta: "", resposta: "" });
          listarTodos();
        } else {
          throw new Error(`Erro ao criar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  const atualizarDuvida = () => {
    if (!atualizarId) return alert("Informe o ID para atualizar");
    if (!duvidaAtualizar.pergunta || !duvidaAtualizar.resposta) {
      return alert("Preencha todos os campos para atualizar");
    }
    setError(null);
    fetch(`${API_URL}/${atualizarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(duvidaAtualizar),
    })
      .then((res) => {
        if (res.ok) {
          alert("Dúvida atualizada com sucesso!");
          setAtualizarId("");
          setDuvidaAtualizar({ pergunta: "", resposta: "" });
          listarTodos();
        } else {
          throw new Error(`Erro ao atualizar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  const deletarDuvida = () => {
    if (!deletarId) return alert("Informe o ID para deletar");
    setError(null);
    fetch(`${API_URL}/${deletarId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Dúvida deletada com sucesso!");
          setDeletarId("");
          listarTodos();
        } else {
          throw new Error(`Erro ao deletar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    listarTodos();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Dúvidas Frequentes (FAQ)</h1>

      {error && <p className="text-red-600 font-semibold mb-4">Erro: {error}</p>}

      {/* Listar todos */}
      <section className="mb-10">
        <button
          onClick={listarTodos}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Listar Todas as Dúvidas
        </button>

        {loading ? (
          <p>Carregando dúvidas...</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {duvidas.map((d) => (
              <li key={d.id} className="border p-4 rounded bg-gray-50">
                <strong>{d.pergunta}</strong> <br />
                Resposta: {d.resposta} <br />
                ID: {d.id}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Criar nova dúvida */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Adicionar Nova Dúvida</h2>
        <input
          type="text"
          placeholder="Pergunta"
          value={novaDuvida.pergunta}
          onChange={(e) => setNovaDuvida({ ...novaDuvida, pergunta: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Resposta"
          value={novaDuvida.resposta}
          onChange={(e) => setNovaDuvida({ ...novaDuvida, resposta: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <br />
        <button
          onClick={criarDuvida}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Adicionar Dúvida
        </button>
      </section>

      {/* Atualizar dúvida */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Atualizar Dúvida</h2>
        <input
          type="number"
          placeholder="ID da Dúvida"
          value={atualizarId}
          onChange={(e) => setAtualizarId(e.target.value)}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Pergunta"
          value={duvidaAtualizar.pergunta}
          onChange={(e) => setDuvidaAtualizar({ ...duvidaAtualizar, pergunta: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Resposta"
          value={duvidaAtualizar.resposta}
          onChange={(e) => setDuvidaAtualizar({ ...duvidaAtualizar, resposta: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <br />
        <button
          onClick={atualizarDuvida}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Atualizar Dúvida
        </button>
      </section>

      {/* Deletar dúvida */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Deletar Dúvida por ID</h2>
        <input
          type="number"
          placeholder="ID da Dúvida"
          value={deletarId}
          onChange={(e) => setDeletarId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={deletarDuvida}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Deletar Dúvida
        </button>
      </section>
    </main>
  );
};

export default DuvidasCrud;
