import React from 'react';
import { useState } from "react";
import "./Register.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import InputField from "../../ui/components/Input";
import SelectField from "../../ui/components/Select";
import { Cursos } from "./Cursos";

const Register = () => {
  const navigate = useNavigate();
  const [curso, setCurso] = useState("");
  const [cursoError, setCursoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const registerUser = async (data) => {
    setLoading(true);
    if (!curso) {
      setCursoError("Coloque seu Curso!");
      return;
    }

    await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        course: curso,
      }),
    })
      .then(async (data) => {
        if (!data.ok) {
          return setError("Esse usuário ja esta cadastrado");
        }

        await Swal.fire({
          title: "Cadastrado com Sucesso",
          text: "Seja bem vindo a nossa comunidade!",
          icon: "success",
          confirmButtonText: "Vamos!",
        }).then(() => {
          navigate("/login");
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="register-container container-xl d-flex p-0">
      <div className="information p-5 position-relative">
        <div className="p-5 text-center ">
          <h2 className="fs-1 fw-bold pb-4">Seja Bem Vindo!</h2>
          <p className="fs-5 fw-light">
            Caso tenha uma conta clique no link abaixo para autenticar-se ao
            site
          </p>
          <p className="fs-5 fw-light">
            O cadastro no site é exclusivo para estudantes da instituição e que
            possuem um email acadêmico
          </p>
        </div>
        <div className="position-absolute w-100 text-center link-info">
          <a href="/login" className="fs-3">
            {" "}
            Logar-se{" "}
          </a>
        </div>
      </div>
      <div className="login-form p-5 text-center d-flex justify-content-center">
        <form
          className="d-flex flex-column"
          onSubmit={handleSubmit(registerUser)}
        >
          <h1 className="fs-1">CADASTRO</h1>
          <p className="fs-4" style={{ color: "#393646" }}>
            Cadastre-se e seja bem vindo a nossa comunidade
          </p>

          <div className="form-group pt-3">
            <InputField
              label="Nome"
              type="text"
              id="nome"
              placeholder="Seu Nome"
              className="me-2 py-2 px-3 fs-5"
              registerOptions={register("name", {
                required: true,
                minLength: 3,
                validate: {
                  noSpecialChars: (value) =>
                    /^[a-zA-Z0-9 ]*$/.test(value) ||
                    "No special characters allowed",
                },
              })}
              errors={errors.name}
            />

            <div className="w-100 text-start">
              <label htmlFor="seletor" className="form-label">
                Curso
              </label>
              <SelectField
                options={Cursos}
                defaultValue={{}}
                onChange={(val) => {
                  setCurso(val.value);
                  setCursoError("");
                }}
              />
              {cursoError && <small>{cursoError}</small>}
            </div>
          </div>

          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="Seu Email"
            className=" py-2 px-3 fs-5"
            registerOptions={register("email", {
              required: true,
            })}
            errors={errors.email}
          />
          <InputField
            label="Sua Senha"
            type="password"
            id="password"
            placeholder="Sua Senha"
            className=" py-2 px-3 fs-5"
            registerOptions={register("password", {
              required: true,
              minLength: 6,
              validate: {
                hasNumber: (value) =>
                  /\d/.test(value) ||
                  "A senha deve conter pelo menos um número",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "A senha deve conter pelo menos um caractere especial",
              },
            })}
            errors={errors.password}
          />

          <button type="submit" className="btn button-outline mx-5 fs-4 mb-3">
            {loading ? "..." : "Cadastrar"}
          </button>

          {error ? (
            <div className="alert alert-warning" role="alert">
              {error}
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default Register;