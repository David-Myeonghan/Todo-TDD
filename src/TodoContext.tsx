import React, {
  createContext,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getLocalStorageItem } from "./localStorage";

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

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todoList, setTodoList] = useState<TodoList>([]);

  useEffect(() => {
    const storageTodos = getLocalStorageItem("todos");
    if (!storageTodos) return;
    setTodoList(storageTodos);
  }, []);

  const value = useMemo(() => ({ todoList, setTodoList }), [todoList]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
