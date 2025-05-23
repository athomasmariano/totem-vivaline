"use client";
import React, { useEffect, useState } from "react";

interface Estacao {
  numeroEstacao?: number;
  nome: string;
  horarioFuncionamento: string;
  descricao: string;
}

const EstacoesCrud = () => {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [buscarNumero, setBuscarNumero] = useState("");
  const [estacaoEncontrada, setEstacaoEncontrada] = useState<Estacao | null>(null);

  const [novaEstacao, setNovaEstacao] = useState<Estacao>({
    nome: "",
    horarioFuncionamento: "",
    descricao: "",
  });

  const [atualizarNumero, setAtualizarNumero] = useState("");
  const [estacaoAtualizar, setEstacaoAtualizar] = useState<Estacao>({
    nome: "",
    horarioFuncionamento: "",
    descricao: "",
  });

  const [deletarNumero, setDeletarNumero] = useState("");

  const API_URL = "https://api-vivaline.onrender.com/Estacoes";
  const API_KEY = "1234";

  const listarTodas = () => {
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
        setEstacoes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const buscarPorNumero = () => {
    if (!buscarNumero) return alert("Informe o número da estação para buscar");
    setError(null);
    fetch(`${API_URL}/${buscarNumero}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          throw new Error("Estação não encontrada");
        }
        if (!res.ok) {
          throw new Error(`Erro ao buscar: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setEstacaoEncontrada(data);
      })
      .catch((err) => {
        setError(err.message);
        setEstacaoEncontrada(null);
      });
  };

  const criarEstacao = () => {
    const { nome, horarioFuncionamento, descricao } = novaEstacao;
    if (!nome || !horarioFuncionamento || !descricao) {
      return alert("Preencha todos os campos obrigatórios para criar");
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(novaEstacao),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Estação criada com sucesso!");
          setNovaEstacao({ nome: "", horarioFuncionamento: "", descricao: "" });
          listarTodas();
        } else {
          throw new Error(`Erro ao criar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  const atualizarEstacao = () => {
    if (!atualizarNumero) return alert("Informe o número da estação para atualizar");
    const { nome, horarioFuncionamento, descricao } = estacaoAtualizar;
    if (!nome || !horarioFuncionamento || !descricao) {
      return alert("Preencha todos os campos obrigatórios para atualizar");
    }
    setError(null);
    fetch(`${API_URL}/${atualizarNumero}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(estacaoAtualizar),
    })
      .then((res) => {
        if (res.ok) {
          alert("Estação atualizada com sucesso!");
          setAtualizarNumero("");
          setEstacaoAtualizar({ nome: "", horarioFuncionamento: "", descricao: "" });
          listarTodas();
        } else {
          throw new Error(`Erro ao atualizar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  const deletarEstacao = () => {
    if (!deletarNumero) return alert("Informe o número da estação para deletar");
    setError(null);
    fetch(`${API_URL}/${deletarNumero}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (res.status === 204) {
          alert("Estação deletada com sucesso!");
          setDeletarNumero("");
          listarTodas();
        } else {
          throw new Error(`Erro ao deletar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    listarTodas();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Estações</h1>

      {error && (
        <p className="text-red-600 font-semibold mb-4">Erro: {error}</p>
      )}

      <section className="mb-10">
        <button
          onClick={listarTodas}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Listar Todas as Estações
        </button>

        {loading ? (
          <p>Carregando estações...</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {estacoes.map((e) => (
              <li key={e.numeroEstacao} className="border p-4 rounded">
                <strong>{e.nome}</strong> <br />
                Número: {e.numeroEstacao} <br />
                Horário: {e.horarioFuncionamento} <br />
                Descrição: {e.descricao}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Buscar Estação por Número</h2>
        <input
          type="number"
          placeholder="Número da Estação"
          value={buscarNumero}
          onChange={(e) => setBuscarNumero(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={buscarPorNumero}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Buscar
        </button>
        {estacaoEncontrada && (
          <div className="mt-4 border p-4 rounded bg-gray-100">
            <p><strong>{estacaoEncontrada.nome}</strong></p>
            <p>Número: {estacaoEncontrada.numeroEstacao}</p>
            <p>Horário: {estacaoEncontrada.horarioFuncionamento}</p>
            <p>Descrição: {estacaoEncontrada.descricao}</p>
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Adicionar Nova Estação</h2>
        <input
          type="text"
          placeholder="Nome"
          value={novaEstacao.nome}
          onChange={(e) => setNovaEstacao({ ...novaEstacao, nome: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Horário de Funcionamento"
          value={novaEstacao.horarioFuncionamento}
          onChange={(e) => setNovaEstacao({ ...novaEstacao, horarioFuncionamento: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novaEstacao.descricao}
          onChange={(e) => setNovaEstacao({ ...novaEstacao, descricao: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <br />
        <button
          onClick={criarEstacao}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Adicionar Estação
        </button>
      </section>

      {/* Atualizar estação */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Atualizar Estação</h2>
        <input
          type="number"
          placeholder="Número da Estação"
          value={atualizarNumero}
          onChange={(e) => setAtualizarNumero(e.target.value)}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Nome"
          value={estacaoAtualizar.nome}
          onChange={(e) => setEstacaoAtualizar({ ...estacaoAtualizar, nome: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Horário de Funcionamento"
          value={estacaoAtualizar.horarioFuncionamento}
          onChange={(e) => setEstacaoAtualizar({ ...estacaoAtualizar, horarioFuncionamento: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={estacaoAtualizar.descricao}
          onChange={(e) => setEstacaoAtualizar({ ...estacaoAtualizar, descricao: e.target.value })}
          className="border p-2 rounded mr-2 mb-2"
        />
        <br />
        <button
          onClick={atualizarEstacao}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Atualizar Estação
        </button>
      </section>

      {/* Deletar estação */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Deletar Estação</h2>
        <input
          type="number"
          placeholder="Número da Estação"
          value={deletarNumero}
          onChange={(e) => setDeletarNumero(e.target.value)}
          className="border p-2 rounded mr-2 mb-2"
        />
        <button
          onClick={deletarEstacao}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Deletar Estação
        </button>
      </section>
    </main>
  );
};

export default EstacoesCrud;
