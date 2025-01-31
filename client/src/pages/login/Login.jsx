import "./LoginPage.css";
import { useForm } from "react-hook-form";
import InputField from "../../ui/components/Input";
import useLogin from "../../data/hooks/auth/useLogin"; // Import the custom hook

const Login = () => {
  const { login, loading } = useLogin(); // Use the custom hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  return (
    <section className="register-container container-xl d-flex p-0">
      <div className="information p-5 position-relative">
        <div className="p-5 text-center">
          <h2 className="fs-1 fw-bold pb-4">Bem Vindo de Volta!</h2>
          <p className="fs-5 fw-light">
            Caso seja um estudante e não tenha cadastro clique no botão abaixo
            para ter uma melhor experiência
          </p>
        </div>
        <div className="position-absolute w-100 text-center link-info">
          <a href="/register" className="fs-3">
            Cadastrar-se
          </a>
        </div>
      </div>
      <div className="login-form login p-5 text-center d-flex justify-content-center">
        <form className="d-flex flex-column" onSubmit={handleSubmit(login)}>
          <h1 className="fs-1">LOGIN</h1>
          <p className="fs-4" style={{ color: "#393646" }}>
            Bem-vindo de volta, estudante!
          </p>

          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            className="me-2 py-2 px-3 fs-5"
            registerOptions={register("email", {
              required: true,
            })}
            errors={errors.email}
          />

          <InputField
            label="Senha"
            type="password"
            id="password"
            placeholder="Senha"
            className="me-2 py-2 px-3 fs-5"
            registerOptions={register("password", {
              required: true,
            })}
            errors={errors.password}
          />

          <button className="btn button-outline mx-5 fs-4 mb-3">
            {loading ? "..." : "Logar"}
          </button>

          <a href="/forgot-password">Esqueceu a senha</a>
        </form>
      </div>
    </section>
  );
};

export default Login;
