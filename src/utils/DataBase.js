import firebaseApp from "./firebase";
import * as firebase from "firebase";

const db = firebase.firestore(firebaseApp);

export const addAlumn = async (d, data) => {
  db.collection("alumnos2")
    .doc(d)
    .set(data)
    .then((res) => console.log("todo bien"))
    .catch((err) => {
      console.log("error en: " + d + "y" + data);
      console.log(err);
    });
};
