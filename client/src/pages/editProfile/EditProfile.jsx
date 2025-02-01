import { useState } from "react";
import "./EditProfile.css";

const EditImage = () => {
    const [image, setImage] = useState(
        "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
    );
    const [imageFile, setImageFile] = useState(null);
    const isAuthenticated = localStorage.getItem('authToken'); 

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

    const updateImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await fetch("http://localhost:3000/user/edit/image", {
                method: "PUT",
                headers: {
                  'Authorization': `Bearer ${isAuthenticated}`,
                },
                body: formData,
            });
            const data = await response.json();
            console.log(data)

            const user = JSON.parse(localStorage.getItem("user"));
            user.Perfil.imageUrl = data.imageUrl;
            localStorage.setItem("user", JSON.stringify(user));

            alert("imagem atualizada");
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            <form
                encType="multipart/form-data"
                className="d-flex flex-column align-items-center gap-5 p-5"
                onSubmit={updateImage}
            >
                <img src={image} alt="" className="image-display" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button
                    type="submit"
                    className="btn button-outline mx-5 fs-4 mb-3 edit-btn"
                >
                    Salvar
                </button>
            </form>
        </section>
    );
};

export default EditImage;