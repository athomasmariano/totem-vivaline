'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Noticia {
  id?: number;
  titulo: string;
  data: string;
}

const NoticiasCrud = () => {
  const router = useRouter();

  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [novaNoticia, setNovaNoticia] = useState<Noticia>({
    titulo: '',
    data: '',
  });

  const [atualizarId, setAtualizarId] = useState('');
  const [noticiaAtualizar, setNoticiaAtualizar] = useState<Noticia>({
    titulo: '',
    data: '',
  });

  const [deletarId, setDeletarId] = useState('');

  const API_URL = 'https://api-vivaline.onrender.com/noticias';
  const API_KEY = '1234';


  const listarNoticias = () => {
    setLoading(true);
    setError(null);
    fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ao listar: ${res.statusText}`);
        return res.json();
      })
      .then(setNoticias)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const criarNoticia = () => {
    if (!novaNoticia.titulo || !novaNoticia.data) {
      return alert('Preencha todos os campos para criar a notícia');
    }

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(novaNoticia),
    })
      .then((res) => {
        if (res.status === 201) {
          alert('Notícia criada com sucesso!');
          setNovaNoticia({ titulo: '', data: '' });
          listarNoticias();
        } else {
          throw new Error(`Erro ao criar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  const atualizarNoticia = () => {
    if (!atualizarId) return alert('Informe o ID da notícia');
    if (!noticiaAtualizar.titulo || !noticiaAtualizar.data) {
      return alert('Preencha todos os campos para atualizar');
    }

    fetch(`${API_URL}/${atualizarId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(noticiaAtualizar),
    })
      .then((res) => {
        if (res.ok) {
          alert('Notícia atualizada com sucesso!');
          setAtualizarId('');
          setNoticiaAtualizar({ titulo: '', data: '' });
          listarNoticias();
        } else {
          throw new Error(`Erro ao atualizar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  const deletarNoticia = () => {
    if (!deletarId) return alert('Informe o ID para deletar');

    fetch(`${API_URL}/${deletarId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': API_KEY,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert('Notícia deletada com sucesso!');
          setDeletarId('');
          listarNoticias();
        } else {
          throw new Error(`Erro ao deletar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    listarNoticias();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => router.push('/colaboradores')}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Voltar ao Menu
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Notícias</h1>

      {error && <p className="text-red-600 font-semibold mb-4">Erro: {error}</p>}

      {/* Listar notícias */}
      <section className="mb-10">
        <button
          onClick={listarNoticias}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Listar Notícias
        </button>

        {loading ? (
          <p>Carregando notícias...</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {noticias.map((n) => (
              <li key={n.id} className="border p-4 rounded bg-gray-50">
                <strong>{n.titulo}</strong> <br />
                Data: {n.data} <br />
                ID: {n.id}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Criar notícia */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Adicionar Nova Notícia</h2>
        <input
          type="text"
          placeholder="Título"
          value={novaNoticia.titulo}
          onChange={(e) => setNovaNoticia({ ...novaNoticia, titulo: e.target.value })}
          className="border p-2 rounded mr-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Data (ex: 2025-05-21)"
          value={novaNoticia.data}
          onChange={(e) => setNovaNoticia({ ...novaNoticia, data: e.target.value })}
          className="border p-2 rounded mr-2 mb-2 w-full"
        />
        <button
          onClick={criarNoticia}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Adicionar Notícia
        </button>
      </section>

      {/* Atualizar notícia */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Atualizar Notícia</h2>
        <input
          type="number"
          placeholder="ID da Notícia"
          value={atualizarId}
          onChange={(e) => setAtualizarId(e.target.value)}
          className="border p-2 rounded mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Título"
          value={noticiaAtualizar.titulo}
          onChange={(e) => setNoticiaAtualizar({ ...noticiaAtualizar, titulo: e.target.value })}
          className="border p-2 rounded mr-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Data (ex: 2025-05-21)"
          value={noticiaAtualizar.data}
          onChange={(e) => setNoticiaAtualizar({ ...noticiaAtualizar, data: e.target.value })}
          className="border p-2 rounded mr-2 mb-2 w-full"
        />
        <button
          onClick={atualizarNoticia}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Atualizar Notícia
        </button>
      </section>

      {/* Deletar notícia */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Deletar Notícia por ID</h2>
        <input
          type="number"
          placeholder="ID da Notícia"
          value={deletarId}
          onChange={(e) => setDeletarId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={deletarNoticia}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Deletar Notícia
        </button>
      </section>
    </main>
  );
};

export default NoticiasCrud;
