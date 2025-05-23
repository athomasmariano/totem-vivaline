"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Duvida = {
  id: number;
  pergunta: string;
  resposta: string;
};

export default function FAQ() {
  const [duvidas, setDuvidas] = useState<Duvida[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    fetch('https://api-vivaline.onrender.com/Duvidas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '1234'
      },
    })
      .then((res) => {
        console.log('Status da resposta:', res.status);
        return res.json();
      })
      .then((data: Duvida[]) => {
        console.log('Dados recebidos da API:', data);
        setDuvidas(data);
      })
      .catch((err) => {
        console.error('Erro ao buscar FAQs:', err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-20 min-h-screen bg-gray-100 p-6">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold mb-4">DÚVIDAS FREQUENTES</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        {duvidas.length === 0 ? (
          <p className="text-gray-500">Nenhuma dúvida cadastrada no momento.</p>
        ) : (
          duvidas.map((duvida, index) => (
            <div key={duvida.id} className="border-b">
              <button
                className="w-full flex justify-between items-center p-3 hover:bg-gray-200"
                onClick={() => toggleQuestion(index)}
              >
                {duvida.pergunta}
                <Image
                  src="/assets/Arrow up-right.svg"
                  width={10}
                  height={10}
                  alt="Seta"
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-90' : ''}`}
                />
              </button>

              {openIndex === index && (
                <div className="p-3 text-gray-600 transition-opacity duration-300">
                  {duvida.resposta}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
