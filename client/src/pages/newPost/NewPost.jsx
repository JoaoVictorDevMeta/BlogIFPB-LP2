import React from "react";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";

const NewPost = () => {
    const navigate = useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
        //form values
        const title = event.target.title.value;
        const description = event.target.description.value;
        const content = event.target.content.value;
        //grouping them
        const post = {title, description, content};

        fetch('http://localhost:3000/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        }).then(response => response.json())
        .then(data => {
            navigate(`/blog/${data.id}`);
        })
        .catch(error => console.log(error));

        console.log(post);
    }

  return (
    <div className="post-container">
      <h1>Novo Blog</h1>
      <form className="new-blog-form" onSubmit={handleSubmit}>
        <div className="input-container title-input">
          <label for="">Título</label>
          <input type="text" name="title" />
        </div>
        <div className="input-container">
          <label for="">Descrição</label>
          <textarea type="text" name="description"></textarea>
        </div>
        <div className="input-container">
          <label for="">Conteúdo</label>
          <textarea type="text" name="content" className="content"></textarea>
        </div>
        <button className="sample-button">Publicar</button>
      </form>
    </div>
  );
};

export default NewPost;
