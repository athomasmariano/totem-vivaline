"use client";
import React, { useEffect, useState } from "react";

interface Comercio {
  id?: number;
  nome: string;
  endereco: string;
  telefone: string;
}

const ComerciosCrud = () => {
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [buscarId, setBuscarId] = useState("");
  const [comercioEncontrado, setComercioEncontrado] = useState<Comercio | null>(null);

  const [novoComercio, setNovoComercio] = useState<Comercio>({
    nome: "",
    endereco: "",
    telefone: "",
  });

  const [atualizarId, setAtualizarId] = useState("");
  const [comercioAtualizar, setComercioAtualizar] = useState<Comercio>({
    nome: "",
    endereco: "",
    telefone: "",
  });

  const [deletarId, setDeletarId] = useState("");

  const API_URL = "https://api-vivaline.onrender.com/Comercios";
  const API_KEY = "1234";

  // Listar todos
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
        setComercios(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // Buscar por ID
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
        if (res.status === 404) {
          throw new Error("Comércio não encontrado");
        }
        if (!res.ok) {
          throw new Error(`Erro ao buscar: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setComercioEncontrado(data);
      })
      .catch((err) => {
        setError(err.message);
        setComercioEncontrado(null);
      });
  };

  // Criar novo
  const criarComercio = () => {
    if (!novoComercio.nome || !novoComercio.endereco || !novoComercio.telefone) {
      return alert("Preencha todos os campos para criar");
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(novoComercio),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Comércio criado com sucesso!");
          setNovoComercio({ nome: "", endereco: "", telefone: "" });
          listarTodos();
        } else {
          throw new Error(`Erro ao criar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  // Atualizar
  const atualizarComercio = () => {
    if (!atualizarId) return alert("Informe o ID para atualizar");
    if (!comercioAtualizar.nome || !comercioAtualizar.endereco || !comercioAtualizar.telefone) {
      return alert("Preencha todos os campos para atualizar");
    }
    setError(null);
    fetch(`${API_URL}/${atualizarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(comercioAtualizar),
    })
      .then((res) => {
        if (res.status === 204) {
          alert("Comércio atualizado com sucesso!");
          setAtualizarId("");
          setComercioAtualizar({ nome: "", endereco: "", telefone: "" });
          listarTodos();
        } else {
          throw new Error(`Erro ao atualizar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  // Deletar
  const deletarComercio = () => {
    if (!deletarId) return alert("Informe o ID para deletar");
    setError(null);
    fetch(`${API_URL}/${deletarId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (res.status === 204) {
          alert("Comércio deletado com sucesso!");
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
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Comércios</h1>

      {error && <p className="text-red-600 font-semibold mb-4">Erro: {error}</p>}

      {/* Listar */}
      <section className="mb-10">
        <button
          onClick={listarTodos}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Listar Todos os Comércios
        </button>
        {loading ? (
          <p>Carregando comércios...</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {comercios.map((c) => (
              <li key={c.id} className="border p-4 rounded">
                <strong>{c.nome}</strong> <br />
                Endereço: {c.endereco} <br />
                Telefone: {c.telefone} <br />
                ID: {c.id}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Buscar por ID */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Buscar Comércio por ID</h2>
        <input
          type="number"
          placeholder="ID"
          value={buscarId}
          onChange={(e) => setBuscarId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={buscarPorId}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Buscar
        </button>
        {comercioEncontrado && (
          <div className="mt-4 border p-4 rounded bg-gray-100">
            <p><strong>{comercioEncontrado.nome}</strong></p>
            <p>Endereço: {comercioEncontrado.endereco}</p>
            <p>Telefone: {comercioEncontrado.telefone}</p>
            <p>ID: {comercioEncontrado.id}</p>
          </div>
        )}
      </section>

      {/* Criar */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Adicionar Novo Comércio</h2>
        <input
          type="text"
          placeholder="Nome"
          value={novoComercio.nome}
          onChange={(e) => setNovoComercio({ ...novoComercio, nome: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Endereço"
          value={novoComercio.endereco}
          onChange={(e) => setNovoComercio({ ...novoComercio, endereco: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={novoComercio.telefone}
          onChange={(e) => setNovoComercio({ ...novoComercio, telefone: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <br />
        <button
          onClick={criarComercio}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Adicionar Comércio
        </button>
      </section>

      {/* Atualizar */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Atualizar Comércio</h2>
        <input
          type="number"
          placeholder="ID do Comércio"
          value={atualizarId}
          onChange={(e) => setAtualizarId(e.target.value)}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Nome"
          value={comercioAtualizar.nome}
          onChange={(e) => setComercioAtualizar({ ...comercioAtualizar, nome: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Endereço"
          value={comercioAtualizar.endereco}
          onChange={(e) => setComercioAtualizar({ ...comercioAtualizar, endereco: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={comercioAtualizar.telefone}
          onChange={(e) => setComercioAtualizar({ ...comercioAtualizar, telefone: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <br />
        <button
          onClick={atualizarComercio}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Atualizar Comércio
        </button>
      </section>

      {/* Deletar */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Deletar Comércio por ID</h2>
        <input
          type="number"
          placeholder="ID do Comércio"
          value={deletarId}
          onChange={(e) => setDeletarId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={deletarComercio}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Deletar Comércio
        </button>
      </section>
    </main>
  );
};

export default ComerciosCrud;
