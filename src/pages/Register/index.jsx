import "./index.css";
import logo from "../../img/Logo.svg";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Button } from "@material-ui/core";
import api from "../../service/api";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ authenticated }) => {
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
    contact: yup.string(),
    bio: yup.string(),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "Mínimo 8 caracteres")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "A senha deve conter pelo menos um caractere maiúsculo, um número e um caractere especial"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "A senha não corresponde"),
    course_module: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onRegister = ({ name, email, password, course_module }) => {
    const user = {
      name,
      email,
      password,
      course_module,
      contact: "999",
      bio: "bio",
    };
    api
      .post("/users", user)
      .then(() => {
        toast.success("Conta criada com sucesso!");
        return history.push("/login");
      })
      .catch((err) => toast.error("Ops! Algo deu errado"));
  };

  const handleReturn = () => {
    history.push("/login");
  };

  return (
    <div className="header--container">
      <header className="header">
        <img className="img" src={logo} alt="Logo Kenzie" />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleReturn()}
        >
          Voltar
        </Button>
      </header>
      <div className="container--form">
        <form className="form" onSubmit={handleSubmit(onRegister)}>
          <h3>Crie sua conta</h3>
          <p>Rapido e grátis, vamos nessa</p>
          <TextField
            fullWidth
            {...register("name")}
            margin="dense"
            label="Nome"
            variant="outlined"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}

          <TextField
            fullWidth
            {...register("email")}
            margin="dense"
            label="Email"
            variant="outlined"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <TextField
            fullWidth
            {...register("password")}
            margin="dense"
            type="password"
            label="Senha"
            variant="outlined"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <TextField
            fullWidth
            {...register("confirmPassword")}
            margin="dense"
            type="password"
            label="Confirme sua senha"
            variant="outlined"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="select-module-label">Selecionar módulo</InputLabel>
            <Select
              {...register("course_module")}
              defaultValue={"Primeiro módulo (Introdução ao Frontend)"}
              labelId="select-module-label"
              id="select-module"
              label="Selecionar módulo"
              onChange={() => {}}
            >
              <MenuItem value={"Primeiro módulo (Introdução ao Frontend)"}>
                Primeiro módulo (Introdução ao Frontend)
              </MenuItem>
              <MenuItem value={"Segundo módulo (Frontend avançado)"}>
                Segundo módulo (Frontend avançado)
              </MenuItem>
              <MenuItem value={"Terceiro módulo (Introdução ao Backend)"}>
                Terceiro módulo (Introdução ao Backend)
              </MenuItem>
              <MenuItem value={"Quarto módulo (Backend avançado)"}>
                Quarto módulo (Backend avançado)
              </MenuItem>
            </Select>
          </FormControl>

          <Button fullWidth type="submit" color="primary" variant="contained">
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
