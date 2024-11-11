import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
    setLoading(true);
    // Opçoes do Login
    // mandando no body o email e a senha do usuário
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    };

    try {
      //realização do fetch necessário para login
      //fetch( URL, OPÇÕES{definidas acima} )
      const response = await fetch("http://localhost:3000/auth/login", options);

      //realizar tratamento de erro no futuro
      //TASK FUTURA - adicionar no projects
      //tipos de erro: 401 (credenciais incorretas), 400(Campos incompletos), 500(erro no servidor)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      //pegando a resposta em json
      //adicionando o token ao localstorage, chamado de authToken
      //adicionando o user ao localstorage, chamado de user
      const userData = await response.json();
      if (userData.token) {
        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.User));
      }

      Swal.fire({
        title: "Logado com Sucesso",
        icon: "success",
        confirmButtonText: "Vamos!",
      }).then(() => {
        // Redireciona, se o login deu certo, para o usuário em questão
        navigate(`/profile/${userData.User.id}`);
      });
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Email ou senha incorretos",
        icon: "error",
        confirmButtonText: "Tentar Novamente",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};

export default useLogin;
