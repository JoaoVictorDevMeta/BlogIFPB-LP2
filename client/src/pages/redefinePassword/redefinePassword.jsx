import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../ui/components/Input";
import "./redefinePassword.css";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const RedefinePassword = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onBlur" });
    //page token validation
    const [tokenSucess, setTokenSucess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");   
    const [loadingPg, setLoadingPg] = useState(false);
    //password hook
    const [passError, setPassError] = useState("");
    const [passloading, setPassLoading] = useState(false);
    const [passSucess, setPassSucess] = useState("");

    const query = useQuery();
    const token = query.get("tt");
    const user = query.get("usr");

    useEffect(() => {
        const verifyToken = async () => {
            setLoadingPg(true);
            const response = await fetch(
                `http://localhost:3000/auth/validate-pass-token/${token}`
            );
            const data = await response.json();
            if (!data?.isValid) {
                setTokenSucess(false);
                setErrorMsg(data.message);
            } else {
                setTokenSucess(true);
            }
            setLoadingPg(false);
        };
        verifyToken();
    }, [token]);

    const sendNewPassword = async (data) => {
        setPassLoading(true);
        const response = await fetch(
            `http://localhost:3000/auth/password-reset`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: data.password,
                    userId: user,
                    token: token,
                }),
            }
        );
        const res = await response.json();
        if(!res.auth){
            setPassError(res.message);
        }else{
            setPassError("");
            setPassSucess(res.message);
        }
        setPassLoading(false);
    }

    return (
        <section className="container-xl mb-3">
            <h1 className="sup-t">BlogIFPB Suporte</h1>
            <div className="login-form login p-3 text-center d-flex justify-content-center redf-pass mt-5">
                {(loadingPg || passloading)? (
                    <h3>Carregando...</h3>
                ) : (
                    <>
                        {tokenSucess ? (
                            <>
                                {(passError && !passSucess) && (
                                    <div className="alert alert-danger" role="alert">
                                        {passError}
                                    </div>
                                )}
                                {passSucess && (
                                    <div className="alert alert-success" role="alert">
                                        {passSucess}! <a href="/login">Clique aqui para fazer login</a>
                                    </div>
                                )}
                                <h3>Redefinir senha</h3>
                                <p>
                                    Coloque sua nova senha para redefinir a
                                    senha da sua conta
                                </p>
                                <form
                                    className="sup-form"
                                    onSubmit={handleSubmit(sendNewPassword)}
                                >
                                    <InputField
                                        label=""
                                        type="password"
                                        id="password"
                                        placeholder="Senha"
                                        className="me-2 py-2 px-3 fs-5"
                                        registerOptions={register("password", {
                                            required: true,
                                        })}
                                        errors={errors.password}
                                    />
                                    <InputField
                                        label=""
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Confirmar senha"
                                        className="me-2 py-2 px-3 fs-5"
                                        registerOptions={register(
                                            "confirmPassword",
                                            {
                                                required: true,
                                                validate: (value) => {
                                                    if (
                                                        value ===
                                                        getValues("password")
                                                    ) {
                                                        return true;
                                                    } else {
                                                        return "As senhas não coincidem";
                                                    }
                                                },
                                            }
                                        )}
                                        errors={errors.confirmPassword}
                                    />
                                    <button className="btn button-outline fs-5">
                                        Redefinir senha
                                    </button>
                                </form>
                            </>
                        ) : (
                            <h3>{errorMsg}! Tente gerar um novo token para redefinir sua senha</h3>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default RedefinePassword;
