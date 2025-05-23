'use client'
import React, { useEffect, useState } from 'react'

type LinhaStatus = {
  nome: string
  cor: string   // classe Tailwind como 'bg-yellow-400'
  status: string
  circulo: string // classe Tailwind como 'bg-green-500'
}

const Status = () => {
  const [linhas, setLinhas] = useState<LinhaStatus[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api-vivaline.onrender.com/StatusLinhas', {  
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '1234', // sua API key
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao carregar dados: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((data: LinhaStatus[]) => {
        setLinhas(data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError('Não foi possível carregar os status das linhas.')
      })
  }, [])

  return (
    <main className="flex-1">
      {error ? (
        <p className="text-red-600 text-center mt-10">{error}</p>
      ) : (
        <>
          <div className="flex justify-center mt-10">
            <div className="space-y-4">
              {linhas.map((linha, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-5 h-5 rounded-full ${linha.cor}`}></div>
                  <span className="text-lg font-medium">{linha.nome}</span>
                  <span className="text-sm">{linha.status}</span>
                  <div className={`w-3 h-3 rounded-full ${linha.circulo}`}></div>
                </div>
              ))}
            </div>
          </div>

          <h1 className="font-sans font-medium flex justify-center pt-14 text-[0.72rem] md:text-[1.25rem] lg:text-[1.5rem]">
            Situações de falha no sistema: saiba como o Metrô informa os passageiros
          </h1>

          <div className="justify-center flex items-center">
            <p className="font-sans text-[0.75rem] md:text-[1rem] lg:text-[1.5rem] font-light pt-14 text-justify w-[23rem] md:w-[40rem] lg:w-[80rem] pb-5">
              Se a ocorrência acontece somente em um trecho da linha, você é informado por mensagens sonoras nos trens e estações.
              <br />
              O metrô é preparado para resolver rapidamente essas ocorrências e compensar o tempo de parada até o final de sua viagem.
            </p>
          </div>

          <div className="justify-center flex items-center">
            <h1 className="font-light lg:text-[1.5rem]">Quando a ocorrência altera o tempo de viagem:</h1>
          </div>

          <div className="justify-center flex items-center">
            <p className="font-light text-[0.75rem] w-[23rem] md:w-[40rem] lg:w-[50rem] md:text-[1rem] lg:text-[1.2rem]">
              Divulgamos pela página STATUS DAS LINHAS em nosso site e nos totens VivaLine nas estações.
            </p>
          </div>
        </>
      )}
    </main>
  )
}

export default Status
