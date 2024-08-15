import React, {
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getLocalStorageItem } from "../utils/localStorage";
import { db, getTodos } from "../firebase";
import { onValue, ref } from "firebase/database";

export type TodoItemType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodoList = Array<TodoItemType>;

type TodoContextType = {
  todoList: TodoList;
  setTodoList: React.Dispatch<SetStateAction<TodoList>>;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

const starCountRef = ref(db, "/todos");

// Prop drilling 해결 용도
export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todoList, setTodoList] = useState<TodoList>([]);
  console.log("when", todoList);

  useEffect(() => {
    // onValue(starCountRef, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    //   setTodoList(data);
    // });
    getTodos().then((res) => {
      console.log(res);
      const todoArray = Object.keys(res).map((key) => ({
        id: key,
        ...res[key],
      }));
      console.log(res);
      console.log(todoArray);
      setTodoList(todoArray);
    });
  }, []);

  return (
    <TodoContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};
