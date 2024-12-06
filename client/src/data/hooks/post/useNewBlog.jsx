import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useAddBlog = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addBlog = async (data) => {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: data.title,
                subTitle: data.description,
                content: data.content,
                image_url: data.image_url,
                category: data.category,
            }),
        };

        try {
            const response = await fetch("http://localhost:3000/blog/create", options);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error);
            }
            const responseData = await response.json();
            console.log(responseData);

            Swal.fire({
                title: "Blog Adicionado com Sucesso",
                icon: "success",
                confirmButtonText: "Vamos!",
            }).then(() => {
                navigate(`/blog/${responseData.id}`);
            });
        } catch (error) {
            console.log(error);
            if (error.message === "Failed to fetch") {
                return Swal.fire({
                    text: "Erro ao tentar adicionar blog, tente novamente mais tarde",
                    icon: "error",
                    confirmButtonText: "Tentar Novamente",
                });
            }
            Swal.fire({
                text: error.message,
                icon: "error",
                confirmButtonText: "Tentar Novamente",
            });
        } finally {
            setLoading(false);
        }
    };

    return { addBlog, loading };
}

export default useAddBlog;