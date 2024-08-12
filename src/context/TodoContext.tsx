import React, {
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getLocalStorageItem } from "../utils/localStorage";
import { database } from "../firebase.config";
import { getDb } from "../firebase";

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

// Prop drilling 해결 용도
export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todoList, setTodoList] = useState<TodoList>(
    () => getLocalStorageItem("todos", []), // 초기에 한번만 가져오도록. 서버 DB 라고 생각.
  );

  console.log(database);

  useEffect(() => {
    getDb().then((res) => console.log(res));
  }, []);

  return (
    <TodoContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};
