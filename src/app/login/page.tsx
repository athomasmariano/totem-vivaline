"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api-vivaline.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "1234", // sua chave API
        },
        body: JSON.stringify({ email: form.email, senha: form.password }),
        credentials: "include",
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "E-mail ou senha inválidos.");
      }

      alert("Login realizado com sucesso!");
      router.push("/");

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro no login.");
      } else {
        setError("Erro desconhecido no login.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Senha"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isSubmitting ? "Enviando..." : "Entrar"}
            </button>
            <a
              href="/cadastro"
              className="text-sm font-semibold text-center block mt-4 text-blue-600 hover:underline"
            >
              Cadastrar-se
            </a>
          </form>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
