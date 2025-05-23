"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Comercio {
  nome: string;
  endereco: string;
  telefone: string;
}

const ComerciosLocais = () => {
  const [comercios, setComercios] = useState<Comercio[]>([]);

  useEffect(() => {
    fetch("https://api-vivaline.onrender.com/Comercios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "1234",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setComercios(data);
      })
      .catch((err) => console.error("Erro ao buscar comércios:", err));
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center px-8 py-10">
      <div className="w-full max-w-4xl">
        {/* Logo + Título */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Image
            className="w-10 md:w-14"
            src="/assets/ViaMobilidade.svg"
            alt="ViaMobilidade"
            width={50}
            height={50}
          />
          <h1 className="text-2xl md:text-4xl font-semibold">
            Estação Paulista
          </h1>
        </div>

        {/* Imagem decorativa */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/assets/chillibeans.jpg" // 
            alt="Imagem da Estação Paulista"
            width={800}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Lista de comércios */}
        {comercios.length > 0 ? (
          comercios.map((comercio, index) => (
            <div
              key={index}
              className="mb-10 p-6 rounded-2xl shadow-md bg-white text-center"
            >
              <h2 className="text-xl md:text-2xl font-medium">
                Loja {index + 1}: {comercio.nome}
              </h2>
              <p className="text-base md:text-lg mt-2">
                Endereço: {comercio.endereco}
              </p>
              <p className="text-sm md:text-base mt-1">
                Telefone: {comercio.telefone}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">Carregando comércios...</p>
        )}
      </div>
    </main>
  );
};

export default ComerciosLocais;
