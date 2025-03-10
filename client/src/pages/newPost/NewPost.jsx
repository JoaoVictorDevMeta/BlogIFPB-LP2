import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./NewPost.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAddBlog from "../../data/hooks/post/useNewBlog";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const { addBlog, loading } = useAddBlog();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/category/all");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = (data) => {
    if (content.length < 200) {
      setError("content", {
        type: "manual",
        message: "O conteúdo do blog deve ter no mínimo 200 caracteres",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subTitle", data.description);
    formData.append("content", content);
    formData.append("category", data.category);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    addBlog(formData);
  };

  const handleContentChange = (value) => {
    setContent(value);
    if (value.length >= 200) {
      clearErrors("content");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
};

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <div>
      <form className="post-container" onSubmit={handleSubmit(onSubmit)}>
        <section className="form-inputs container-xxl conteudo-xxl mt-5 py-5 mb-5 p-5">
          <div className="title-input">
            <label htmlFor="">Título do Blog</label>
            <input
              placeholder="Título do seu blog"
              type="text"
              {...register("title", {
                required: "Título do blog obrigatório",
                minLength: "Título do blog muito curto",
                maxLength: "Título do blog muito longo",
              })}
            />
          </div>
          <div className="desc-input">
            <label htmlFor="">Descrição do Blog</label>
            <textarea
              placeholder="Descrição do seu blog"
              type="text"
              {...register("description", {
                required: "Descrição do blog obrigatória",
                minLength: "Descrição do blog muito curta",
                maxLength: "Descrição do blog muito longa",
              })}
            />
          </div>
          <div className="title-input image-input">
            <label htmlFor="">Imagem do blog</label>
            <img src={image} alt="" className="newpostImage"/>
            <input 
              type="file"
              accept="image/*"
              onChange={handleFileChange} 
            />
          </div>
          <h2>Conteúdo do Blog</h2>
          <div>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </section>
        <aside className="my-5">
          <button>{loading ? "..." : "Publicar blog"}</button>

          <div className="mt-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                defaultValue={"Categoria"}
                {...register("category", {
                  required: "Categoria do blog obrigatória",
                  validate: (value) =>
                    value !== "Categoria" ||
                    "Por favor, selecione uma categoria",
                })}
              >
                <option disabled>Categoria</option>
                {categories?.map((category, index) => (
                  <option value={category.name} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelect">
                Escolha a categoria do seu Blog
              </label>
            </div>
          </div>
          {!isEmptyObject(errors) ? (
            <ul className="form-errors">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key}>{error.message}</li>
              ))}
            </ul>
          ) : null}
        </aside>
      </form>
    </div>
  );
};

export default NewPost;
