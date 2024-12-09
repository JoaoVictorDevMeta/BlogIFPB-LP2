import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Blog.css";

import Categoria from "../../ui/partials/Categoria";
import Title from "../../ui/partials/Title";
import Subtitle from "../../ui/partials/Author";
import Texto from "../../ui/partials/Texto";
import Imagem from "../../ui/partials/Imagem";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/blog/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  function deleteBlog() {
    fetch(`http://localhost:3000/blog/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Blog deletado com sucesso!");
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <section className="container-xxl conteudo-xxl mt-5 py-5 mb-5">
        <Categoria categoria={blog?.category?.name} />
        <Title title={blog?.title || "..."} />
        <div className="conteudo-subtitle mx-4">
          <p className="fs-4">{blog?.subTitle}</p>
        </div>
        <Imagem
          alt="Imagem inicial"
          descricao="Descrição da imagem"
          autor={blog?.author?.Perfil?.name}
          fonte="Google"
          src={blog?.image_url}
        />
        <div className="blog-content d-flex">
          <div className="author-info">
            <Subtitle
              description={blog?.author?.Perfil?.description}
              autor={blog?.author?.Perfil?.name}
              data={blog?.createdAt}
              atualizado={blog?.updatedAt}
              autorCourse={blog?.author?.Perfil?.course}
              autorId={blog?.author?.id}
              createDate={blog?.createdAt ? formatDate(blog.createdAt) : ''}
              userId={blog?.author?.id}
              blogId={blog?.id}
            />
          </div>
          <Texto texto={blog?.content || "..."} />
        </div>
      </section>
    </>
  );
};

export default Blog;
