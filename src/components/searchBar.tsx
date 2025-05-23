'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const searchItems = [
    { name: 'Home', path: '/' },
    { name: 'Início', path: '/' },
    { name: 'Inicio', path: '/' },
    { name: 'Sobre', path: '/QuemSomos' },
    { name: 'Dúvidas', path: '/Duvidas' },
    { name: 'Duvidas', path: '/Duvidas' },
    { name: 'Cadastro', path: '/cadastro' },
    { name: 'Login', path: '/login' },
    { name: 'Mapa', path: '/mapainterativo' },
    { name: 'Mapa Interativo', path: '/mapainterativo' },
    { name: 'Status das Linhas', path: '/StatusLinhas' },
    { name: 'Status', path: '/StatusLinhas' },
    { name: 'Comércios', path: '/Comercios' },
    { name: 'Comercios', path: '/Comercios' },
    { name: 'Comércios Locais', path: '/Comercios' },
    { name: 'Comercios Locais', path: '/Comercios' },
    { name: 'Chatbot', path: '/Chatbot' },
    { name: 'Chat', path: '/Chatbot' }
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isClient) return;

    const trimmed = search.trim().toLowerCase();

    if (!trimmed) {
      alert('Por favor, digite algo para pesquisar.');
      return;
    }

    const result = searchItems.find(item =>
      item.name.toLowerCase().includes(trimmed)
    );

    if (result) {
      router.push(result.path);
    } else {
      alert('Nenhum resultado encontrado.');
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex items-center bg-white rounded-full px-3 py-1 shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
        className="flex-1 text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none"
      />
      <button 
        type="submit" 
        className="text-gray-600 hover:text-black text-lg"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
