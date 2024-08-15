import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  remove,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { TodoItemType } from "./context/TodoContext";
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
const dbRef = ref(getDatabase());
export const getTodos = () =>
  get(child(dbRef, `/todos`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

export const modifyTotoItem = async (item: TodoItemType) => {
  const db = getDatabase();
  return await set(ref(db, "todos/" + item.id), {
    id: item.id,
    title: item.title,
    isDone: item.isDone,
  });
};

export const deleteTodoItem = async (id: string) => {
  const db = getDatabase();
  return await set(ref(db, "todos/" + id), null);
};

const starCountRef = ref(db, "/todos");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  return data;
});
