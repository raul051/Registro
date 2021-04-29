import React, { useEffect, useState } from "react";
import "./App.css";
import { addAlumn } from "./utils/DataBase";
import "firebase/auth";
import firebase from "./utils/firebase";

const App = () => {
  const [test, setTest] = useState([]);
  const [logico, setlogico] = useState([]);
  const [matematico, setmatematico] = useState([]);
  const [lengua, setlengua] = useState([]);
  const [alumnos, setalumnos] = useState({});
  useEffect(() => {
    for (let i = 0; i <= 90; i++) {
      test.push({ pregunta: "", respuesta: "" });
      logico.push({ pregunta: "", respuesta: "" });
      matematico.push({ pregunta: "", respuesta: "" });
      lengua.push({ pregunta: "", respuesta: "" });
    }
  }, []);

  const registrar = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(alumnos.email, alumnos.password)
      .then((res) => {
        var data = {
          user: res.user.uid,
          activeExam1: true,
          activeLogic: true,
          activeMat: true,
          activeLengua: true,
          time: 10800,
          timeLogic: 7300,
          timeMat: 7300,
          timeLeng: 7300,
          username: alumnos.username,
          alumnData: { carrera: alumnos.carrera },
          test: test,
          logico: logico,
          matematico: matematico,
          lengua: lengua,
        };
        addAlumn(res.user.uid, data)
          .then((re) => console.log(re))
          .catch((err) => console.log(err));
        sendVerificationEmail();
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then((res) => {
        console.log(res);
        alert("Correo enviado");
      })
      .catch((err) => {
        console.log(err);
        alert("Error al enviar email" + err);
      });
  };
  const cambiar = (e) => {
    const { value, name } = e.target;
    setalumnos({
      ...alumnos,
      [name]: value,
    });
  };

  return (
    <div>
    <nav className="nav-extended green">
      <div className="nav-wrapper ">
        <a href="#" className="brand-logo" id="logo">ADMINISTRADOR</a>
      
      <div>
        <ul className="right hide-on-med-and-down">
        <a className="btn-floating btn-large waves-effect waves-light red" href="https://seaniadministrador.web.app/alumnos" title="Regresar"><i className="material-icons">arrow_back</i></a>
        </ul>
      </div>
    </div>
  </nav>
  <br/>
<div className="container">
    <h3 className="center" >REGISTRO DE ALUMNOS ETAPA 1 2021</h3>
    <br/>
  <div className="card-panel hoverable grey lighten-5 col s12">
      <input type="text" placeholder="email" name="email" onChange={cambiar} />
  </div>
  
  <div className="card-panel hoverable grey lighten-5 col s12">
      <input
        type="text"
        placeholder="password"
        name="password"
        onChange={cambiar}
      />
  </div>

  <div className="card-panel hoverable grey lighten-5 col s12">
      <input
        type="text"
        placeholder="Nombre completo"
        name="username"
        onChange={cambiar}
      />
  </div>

  <div className="card-panel hoverable grey lighten-5 col s12">
      <input type="text" placeholder="Carrera" name="carrera" onChange={cambiar} />
  </div>
    <div className="center">
      <a className="waves-effect waves-light btn-large center orange darken-4" id="boton" type="submit" onClick={registrar}><i className="material-icons right">send</i>Registrar alumno</a>
    </div>  
</div>

    </div>
  );
};
export default App;
