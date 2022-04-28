import x from "../../img/X.svg";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import api from "../../service/api";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { useState } from "react";

const ModalTech = ({ techs, setTechs, handleClose }) => {
  const [token] = useState(localStorage.getItem("kenziehub:token"));

  const schema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    status: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onRegister = ({ title, status }) => {
    const userTech = {
      title,
      status,
    };
    api
      .post("/users/techs", userTech, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTechs([...techs, response.data]);
        toast.success("Tecnologia adicionada com sucesso!");
        handleClose();
      })
      .catch((err) => toast.error("Ops! Algo deu errado"));
  };

  return (
    <div>
      <div className="header--modal">
        <h3>Cadastrar Tecnologia</h3>
        <img className="img" src={x} alt="fechar" />
      </div>
      <form onSubmit={handleSubmit(onRegister)}>
        <TextField
          fullWidth
          {...register("title")}
          margin="dense"
          label="Nome"
          variant="outlined"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="select-module-label">Selecionar status</InputLabel>
          <Select
            {...register("status")}
            defaultValue={"Iniciante"}
            labelId="select-module-label"
            id="select-module"
            label="Selecionar status"
            onChange={() => {}}
          >
            <MenuItem value={"Iniciante"}>Iniciante</MenuItem>
            <MenuItem value={"Intermediário"}>Intermediário</MenuItem>
            <MenuItem value={"Avançado"}>Avançado</MenuItem>
          </Select>
        </FormControl>

        <Button fullWidth type="submit" color="primary" variant="contained">
          Cadastrar Tecnologia
        </Button>
      </form>
    </div>
  );
};

export default ModalTech;
