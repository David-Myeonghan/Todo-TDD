import React, { createContext, SetStateAction, useState } from "react";
import { getLocalStorageItem } from "../utils/localStorage";

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
  const [todoList, setTodoList] = useState<TodoList>([]);

  return (
    <TodoContext.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};
