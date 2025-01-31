import { useState } from "react";

const useSendRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const send = async (data) => {
        setLoading(true);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
            }),
        };

        try {
            const response = await fetch(
                "http://localhost:3000/auth/password-forgot",
                options
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error);
            }

            setSuccess(true);
        } catch (error) {
            console.log(error);
            setSuccess(false);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        send,
        loading,
        error,
        success,
    };
};

export default useSendRequest;
