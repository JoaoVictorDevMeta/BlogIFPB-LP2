import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  //pega o token que esta no localStorage
  //localStorage esta localizado na aba application
  const isAuthenticated = localStorage.getItem('authToken'); 

  useEffect(() => {
    //para que se use uma funcao asincrona no useEffect 
    //é preciso que seja criada em seu interior
    const checkAuthentication = async () => {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${isAuthenticated}`,
          }
        };

        //Fazendo requisição e tratando a resposta
        //modelo de resposta {message: String , isValid: Boolean}
        const response = await fetch('http://localhost:3000/auth/validate', options);
        const data = await response.json();
        
        // verificando a existencia de uma mensagem
        //caso não haja ou seja inválida, a autenticação nao corresponda
        if (data && data.isValid) {
          setAuthenticated(true); 
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.error('Error during authentication check:', err);
        setAuthenticated(false); 
      } finally {
        //apenas ao final finalizamos o carregamento da página
        //evitando que conteudo sensível apareça
        setLoading(false);
      }
    };

    // Chamando a devida função
    checkAuthentication();
    //caso haja alguma alteração (por enquanto NÃO)
    //a rota irá atualizar
  }, [isAuthenticated]);

  //página de carregamento
  if (loading) {
    return <>Loading...</>;
  }

  //redirecionao usuário para login caso não esteja autenticado
  if (!authenticated) {
    return <Navigate to="/login" />; 
  }

  //renderiza a rota protegida especificada
  return <Outlet />;
};

export default PrivateRoute;
