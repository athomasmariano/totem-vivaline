"use client";
import React, { useEffect, useState, ChangeEvent } from "react";

interface LinhaStatus {
  id?: number;
  nome: string;
  cor: string;
  status: string;
  circulo: string;
}

const StatusLinhasCrud = () => {
  const [statusLinhas, setStatusLinhas] = useState<LinhaStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [buscarId, setBuscarId] = useState("");
  const [linhaEncontrada, setLinhaEncontrada] = useState<LinhaStatus | null>(null);

  const [novaLinha, setNovaLinha] = useState<LinhaStatus>({
    nome: "",
    cor: "",
    status: "",
    circulo: "",
  });

  const [atualizarId, setAtualizarId] = useState("");
  const [linhaAtualizar, setLinhaAtualizar] = useState<LinhaStatus>({
    nome: "",
    cor: "",
    status: "",
    circulo: "",
  });

  const [deletarId, setDeletarId] = useState("");

  const API_URL = "https://api-vivaline.onrender.com/StatusLinhas";
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
      .then((data: LinhaStatus[]) => {
        if (Array.isArray(data)) {
          setStatusLinhas(data);
        } else {
          setError("Resposta da API não é uma lista");
          setStatusLinhas([]);
        }
        setLoading(false);
        console.log("Resposta da API:", data);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const buscarPorId = () => {
    if (!buscarId) return alert("Informe um ID para buscar");
    setError(null);
    fetch(`${API_URL}/${buscarId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (res.status === 404) throw new Error("Status de linha não encontrado");
        if (!res.ok) throw new Error(`Erro ao buscar: ${res.statusText}`);
        return res.json();
      })
      .then((data: LinhaStatus) => setLinhaEncontrada(data))
      .catch((err: Error) => {
        setError(err.message);
        setLinhaEncontrada(null);
      });
  };

  const criarLinha = () => {
    const { nome, cor, status, circulo } = novaLinha;
    if (!nome || !cor || !status || !circulo) {
      return alert("Preencha todos os campos para criar");
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(novaLinha),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Status de linha criado com sucesso!");
          setNovaLinha({ nome: "", cor: "", status: "", circulo: "" });
          listarTodos();
        } else {
          throw new Error(`Erro ao criar: ${res.statusText}`);
        }
      })
      .catch((err: Error) => setError(err.message));
  };

  const atualizarLinha = () => {
    const { nome, cor, status, circulo } = linhaAtualizar;
    if (!atualizarId) return alert("Informe o ID para atualizar");
    if (!nome || !cor || !status || !circulo) {
      return alert("Preencha todos os campos para atualizar");
    }
    setError(null);
    fetch(`${API_URL}/${atualizarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(linhaAtualizar),
    })
      .then((res) => {
        if (res.ok) {
          alert("Status da linha atualizado com sucesso!");
          setAtualizarId("");
          setLinhaAtualizar({ nome: "", cor: "", status: "", circulo: "" });
          listarTodos();
        } else {
          throw new Error(`Erro ao atualizar: ${res.statusText}`);
        }
      })
      .catch((err: Error) => setError(err.message));
  };

  const deletarLinha = () => {
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
          alert("Status da linha deletado com sucesso!");
          setDeletarId("");
          listarTodos();
        } else {
          throw new Error(`Erro ao deletar: ${res.statusText}`);
        }
      })
      .catch((err: Error) => setError(err.message));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    obj: LinhaStatus,
    setObj: React.Dispatch<React.SetStateAction<LinhaStatus>>
  ) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
  };

  useEffect(() => {
    listarTodos();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Status das Linhas</h1>

      {error && <p className="text-red-600 font-semibold mb-4">Erro: {error}</p>}

      {/* Listar todos */}
      <section className="mb-10">
        <button onClick={listarTodos} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Listar Todos os Status
        </button>

        {loading ? (
          <p>Carregando status das linhas...</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {statusLinhas.map((l) => (
              <li key={l.id} className="border p-4 rounded">
                <strong>{l.nome}</strong><br />
                Cor: {l.cor}<br />
                Status: {l.status}<br />
                Círculo: {l.circulo}<br />
                ID: {l.id}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Buscar por ID */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Buscar Status por ID</h2>
        <input
          type="number"
          placeholder="ID"
          value={buscarId}
          onChange={(e) => setBuscarId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button onClick={buscarPorId} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Buscar
        </button>
        {linhaEncontrada && (
          <div className="mt-4 border p-4 rounded bg-gray-100">
            <p><strong>{linhaEncontrada.nome}</strong></p>
            <p>Cor: {linhaEncontrada.cor}</p>
            <p>Status: {linhaEncontrada.status}</p>
            <p>Círculo: {linhaEncontrada.circulo}</p>
            <p>ID: {linhaEncontrada.id}</p>
          </div>
        )}
      </section>

      {/* Criar nova linha */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Adicionar Novo Status</h2>
        {["nome", "cor", "status", "circulo"].map((field) => (
          <input
            key={field}
            name={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={novaLinha[field as keyof LinhaStatus]}
            onChange={(e) => handleInputChange(e, novaLinha, setNovaLinha)}
            className="border p-2 rounded mr-2 mb-2"
          />
        ))}
        <br />
        <button
          onClick={criarLinha}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Adicionar Status
        </button>
      </section>

      {/* Atualizar linha */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Atualizar Status</h2>
        <input
          type="number"
          placeholder="ID do Status"
          value={atualizarId}
          onChange={(e) => setAtualizarId(e.target.value)}
          className="border p-2 rounded mr-2 mb-2"
        />
        {["nome", "cor", "status", "circulo"].map((field) => (
          <input
            key={field}
            name={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={linhaAtualizar[field as keyof LinhaStatus]}
            onChange={(e) => handleInputChange(e, linhaAtualizar, setLinhaAtualizar)}
            className="border p-2 rounded mr-2 mb-2"
          />
        ))}
        <br />
        <button
          onClick={atualizarLinha}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Atualizar Status
        </button>
      </section>

      {/* Deletar linha */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Deletar Status por ID</h2>
        <input
          type="number"
          placeholder="ID do Status"
          value={deletarId}
          onChange={(e) => setDeletarId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={deletarLinha}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Deletar Status
        </button>
      </section>
    </main>
  );
};

export default StatusLinhasCrud;
