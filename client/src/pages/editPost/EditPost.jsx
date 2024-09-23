import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    console.log(blogId);

    useEffect(() => {
        fetch(`http://localhost:3000/blog/${blogId}`)
          .then(response => response.json())
          .then(data => setBlog(data))
    }, []);
    
    function handleSubmit(event) {
        event.preventDefault();
        //form values
        const title = event.target.title.value;
        const description = event.target.description.value;
        const content = event.target.content.value;
        //grouping them
        const post = {title, description, content};

        fetch(`http://localhost:3000/blog/${blog?.id}`, {
            method: 'PUT',
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
      <h1>Editando Blog</h1>
      <form className="new-blog-form" onSubmit={handleSubmit}>
        <div className="input-container title-input">
          <label for="">Título</label>
          <input type="text" name="title" defaultValue={blog?.title}/>
        </div>
        <div className="input-container">
          <label for="">Descrição</label>
          <textarea type="text" name="description" defaultValue={blog?.description}></textarea>
        </div>
        <div className="input-container">
          <label for="">Conteúdo</label>
          <textarea type="text" name="content" className="content" defaultValue={blog?.content}></textarea>
        </div>
        <button className="sample-button">Publicar</button>
      </form>
    </div>
  );
};

export default EditPost;
