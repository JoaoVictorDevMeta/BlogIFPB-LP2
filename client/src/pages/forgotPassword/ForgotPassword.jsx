import "./ForgotPassword.css";
import { useForm } from "react-hook-form";
import InputField from "../../ui/components/Input";
import useSendRequest from "../../data/hooks/auth/useForgotPassword";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onBlur" });
    const { send, loading, error, success } = useSendRequest();

    const sendEmailRequest = (data) => {
        send(data);
    };
    console.log(success);
    console.log(error);

    return (
        <section className="container-xl mb-3">
            <h1 className="sup-t">BlogIFPB Suporte</h1>
            <div className="support-container mt-5">
                {!loading ? (
                    <>
                        {success && (
                            <div className="alert alert-success" role="alert">
                                Email enviado com sucesso! Cheque sua caixa de email para prosseguir com a redefinição de senha.
                                <br /><br />
                                Você ja pode fechar essa página!
                            </div>
                        )}
                        {(error && !success) && (
                            <div className="alert alert-danger" role="alert">
                                {error.message}
                            </div>
                        )}

                        <h3>Esqueci a senha da minha conta do BlogIFPB</h3>
                        <p>
                            Coloque o endereço email da sua conta para que
                            possamos prosseguir com os próximos passos
                        </p>
                        <form
                            onSubmit={handleSubmit(sendEmailRequest)}
                            className="sup-form"
                        >
                            <InputField
                                label=""
                                type="email"
                                id="email"
                                placeholder="Email"
                                className="me-2 py-2 px-3 fs-5"
                                registerOptions={register("email", {
                                    required: true,
                                })}
                                errors={errors.email}
                            />

                            <button className="btn button-outline fs-5">
                                Enviar
                            </button>
                        </form>
                    </>
                ) : (
                    <div>Carregando...</div>
                )}
            </div>
        </section>
    );
};

export default ForgotPassword;
