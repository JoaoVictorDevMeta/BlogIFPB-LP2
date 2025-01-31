import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import BlogResult from "../../ui/components/BlogResult";

const Profile = () => {
  const mediaList = [<FaGithub />, <FaFacebook />, <FaInstagram />];
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  console.log(blogs);

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.error) throw new Error(data.error);
        setUser(data.user);
        setBlogs(data.posts);
      })
      .catch((err) => {console.log(err); setError(true)})
      .finally(() => setLoading(false));
  }, []);

  //console.log(user)
  if(loading){
    return <h1 className="text-center">Carregando...</h1>
  }

  if(error){
    return <h1 className="text-center">Erro ao carregar a página</h1>
  }

  return (
    <section className="container-xxl mt-5 profile-container">
      <div className="background-image">
        <img
          src="https://th.bing.com/th/id/R.f3adb71b5c1d471ea94aebdba770245e?rik=EuDRrlBDE%2fMhkw&pid=ImgRaw&r=0"
          alt=""
        />
      </div>
      <div className="user-container">
        <div className="user-card">
          <div className="user-image">
            <img
              src={
                user.Perfil?.image_url
                  ? user.Perfil.image_url
                  : "https://th.bing.com/th/id/R.d7068367c4367960647a732c708d3ca8?rik=kAnNBuF4K4Jo1Q&pid=ImgRaw&r=0"
              }
              alt=""
            />
          </div>
          <div className="user-info">
            <h3>{user.Perfil?.name}</h3>
            <span>
              {user.Diplomas?.lenght ? "Professor" : "Aluno"} |{" "}
              {user.Perfil?.course}
            </span>
          </div>
        </div>
        <div className="user-posts">
          <div className="user-desc pb-5">
            <h2 className="mb-4">Sobre</h2>
            <span>
              {user.Perfil?.description
                ? user.Perfil.description
                : "Sem descrição"}
            </span>
          </div>
          <div className="posts-container">
            <h2 className="mb-4">Blogs</h2>
            <div className="posts-list">
              {!blogs.length && (
                <h4>
                  Nenhum blog postado...
                </h4>
              )}
              {blogs?.map((blog) => (
                <BlogResult
                  key={blog.id}
                  title={blog?.title}
                  image={blog?.image_url}
                  description={blog?.subTitle}
                  category={blog?.category?.name}
                  link={blog?.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
