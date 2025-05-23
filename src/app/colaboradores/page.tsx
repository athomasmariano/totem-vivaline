'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ColaboradoresPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    if (login === 'admin' && senha === 'admin') {
      localStorage.setItem('auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('/assets/imagemmetro.png')" }}

      >
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Área do Colaborador</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Usuário"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Painel do Colaborador</h1>
          <button
            onClick={() => {
              localStorage.removeItem('auth');
              setIsAuthenticated(false);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <LinkCard href="/colaboradores/estacoes" label="Gerenciar Estações" />
          <LinkCard href="/colaboradores/statuslinhas" label="Gerenciar Status de Linhas" />
          <LinkCard href="/colaboradores/duvidas" label="Gerenciar Dúvidas" />
          <LinkCard href="/colaboradores/comercios" label="Gerenciar Comércios" />
          <LinkCard href="/colaboradores/noticias" label="Gerenciar Notícias" />
          <LinkCard href="/colaboradores/users" label="Gerenciar Usuários" />
        </div>
      </main>

      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Vivaline. Todos os direitos reservados.
      </footer>
    </div>
  );
}

function LinkCard({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-xl shadow hover:shadow-md p-6 text-center font-medium text-gray-800 hover:bg-blue-50 transition-all"
    >
      {label}
    </Link>
  );
}
