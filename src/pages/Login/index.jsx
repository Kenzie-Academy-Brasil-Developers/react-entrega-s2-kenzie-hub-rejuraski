import "./index.css";
import { TextField } from "@mui/material";
import { Button } from "@material-ui/core";
import logo from "../../img/Logo.svg";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../service/api";
import { useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ authenticated }) => {
  const history = useHistory();
  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "Mínimo 8 caracteres")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "A senha deve conter pelo menos um caractere maiúsculo, um número e um caractere especial"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onRegister = ({ email, password }) => {
    const user = { email, password };
    api
      .post("/sessions", user)
      .then((response) => {
        localStorage.setItem("kenziehub:token", response.data.token);
        toast.success("Login realizado com sucesso!");
        return history.push(`/dashboard/${response.data.user.id}`);
      })
      .catch((err) => toast.error("Ops! Algo deu errado"));
  };

  const handleJoin = () => {
    history.push("/register");
  };

  return (
    <div>
      <div className="container--form">
        <header>
          <img className="img" src={logo} alt="Logo Kenzie" />
        </header>
        <form className="form" onSubmit={handleSubmit(onRegister)}>
          <h2>Login</h2>
          <TextField
            {...register("email")}
            fullWidth
            margin="dense"
            label="Email"
            variant="outlined"
            required
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <TextField
            {...register("password")}
            fullWidth
            margin="dense"
            type="password"
            label="Senha"
            variant="outlined"
            required
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <Button type="submit" fullWidth color="primary" variant="contained">
            Entrar
          </Button>

          <p>Ainda não possui uma conta?</p>

          <button className="register--button" onClick={() => handleJoin()}>
            Cadastre-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
