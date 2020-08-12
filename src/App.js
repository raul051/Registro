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
        alert("error");
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
        alert("Error al enviar email");
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
      <input type="" placeholder="email" name="email" onChange={cambiar} />
      <input
        type=""
        placeholder="password"
        name="password"
        onChange={cambiar}
      />
      <input
        type=""
        placeholder="Nombre completo"
        name="username"
        onChange={cambiar}
      />
      <input type="" placeholder="Carrera" name="carrera" onChange={cambiar} />
      <button onClick={registrar}>Enviar informacion</button>
    </div>
  );
};
export default App;
