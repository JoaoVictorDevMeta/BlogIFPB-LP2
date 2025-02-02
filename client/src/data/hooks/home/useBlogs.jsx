import { useState, useEffect } from "react";

const useBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:3000/blog/all");
                const data = await response.json();
                setBlogs(data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, loading, error };
};

export default useBlogs;
