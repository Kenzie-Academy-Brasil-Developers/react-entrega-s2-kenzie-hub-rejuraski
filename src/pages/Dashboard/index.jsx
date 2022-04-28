import "./index.css";
import logo from "../../img/Logo.svg";
import close from "../../img/Close.svg";
import trash from "../../img/trash.svg";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import ModalTech from "../../components/ModalTech";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../../service/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: "24px",
  p: 4,
};

const Dashboard = () => {
  const history = useHistory();
  const [techs, setTechs] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [module, setModule] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((response) => {
        setTechs(response.data.techs);
        setName(response.data.name);
        setModule(response.data.course_module);
      })
      .catch((err) => toast.error("Ops! Algo deu errado"));
  }, [id]);

  const handleDelete = (id) => {
    const token = localStorage.getItem("kenziehub:token");
    api
      .delete(`/users/techs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTechs(techs.filter((tech) => tech.id !== id));
        toast.success("Tecnologia excluída com sucesso!");
      })
      .catch((err) => toast.error("Não foi possível excluir a tecnologia."));
  };

  const handleBack = () => {
    localStorage.removeItem("kenziehub:token");
    history.push("/login");
  };

  if (!localStorage.getItem("kenziehub:token")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container--dash">
      <div>
        <header className="header--dashboard">
          <img className="img" src={logo} alt="Logo Kenzie" />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleBack()}
          >
            Sair
          </Button>
        </header>
        <div className="div--name">
          <h2>Olá, {name}</h2>
          <p>{module}</p>
        </div>
        <div className="div--tech">
          <h2>Tecnologias</h2>
          <img className="img" onClick={handleOpen} src={close} alt="fechar" />
        </div>
        <ul className="ul--techs">
          {techs.map((tech) => (
            <li className="li--tech" key={tech.id}>
              <p className="p--title">{tech.title}</p>
              <p className="p--status">{tech.status}</p>
              <img
                className="img--tech"
                onClick={() => handleDelete(tech.id)}
                src={trash}
                alt="lixo"
              />
            </li>
          ))}
        </ul>
        <div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <ModalTech
                techs={techs}
                setTechs={setTechs}
                handleClose={handleClose}
              />
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
