import { child, get, getDatabase, ref } from "firebase/database";

const dbRef = ref(getDatabase());
export const getDb = () =>
  get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
