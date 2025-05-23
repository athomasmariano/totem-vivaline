"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Cadastro = () => {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [errors, setErrors] = useState({ nome: "", email: "", senha: "" });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const formErrors  = { nome: "", email: "", senha: "" };
    let isValid = true;

    if (!form.nome) {
      formErrors.nome = "Nome é obrigatório.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      formErrors.email = "E-mail é obrigatório.";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      formErrors.email = "E-mail inválido.";
      isValid = false;
    }

    if (!form.senha) {
      formErrors.senha = "Senha é obrigatória.";
      isValid = false;
    } else if (form.senha.length < 6) {
      formErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError("");

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api-vivaline.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "1234",
        },
        body: JSON.stringify(form),
      });

      const text = await response.text();
      console.log("Resposta backend:", response.status, text);

      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        setForm({ nome: "", email: "", senha: "" });
        router.push("/login");
      } else if (response.status === 409) {
        setServerError(text || "E-mail já cadastrado.");
      } else {
        setServerError(text || "Erro inesperado ao registrar.");
      }
    } catch (error) {
      setServerError("Erro ao conectar com o servidor.");
      console.error("Erro no fetch:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Cadastro</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="nome"
                placeholder="Nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.nome && (
                <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
              )}
            </div>

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
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                name="senha"
                type="password"
                placeholder="Senha"
                value={form.senha}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.senha && (
                <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
              )}
            </div>

            {serverError && (
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {isSubmitting ? "Enviando..." : "Cadastrar"}
            </button>

            <a
              href="/login"
              className="text-sm font-semibold text-center block mt-4 text-blue-600 hover:underline"
            >
              Já tem conta? Entrar
            </a>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Cadastro;
