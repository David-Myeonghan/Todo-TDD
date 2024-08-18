import React, { useEffect } from "react";
import "./App.css";
import Input from "./components/Input";
import TodoItemList from "./components/TodoItemList";
import TodoFilter from "./components/TodoFilter";
import { useTodoContext } from "./context/useTodoContext";
import { getLocalStorageItem } from "./utils/localStorage";

function App() {
  const { setTodoList } = useTodoContext();

  useEffect(() => {
    setTodoList(getLocalStorageItem("todos", []));
  }, [setTodoList]);

  return (
    <div className="app">
      <div className="wrapper">
        <Input />
        <TodoItemList />
        <TodoFilter />
      </div>
    </div>
  );
}

export default App;
