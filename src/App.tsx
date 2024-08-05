import React from "react";
import "./App.css";
import { TodoContextProvider } from "./context/TodoContext";
import Input from "./components/Input";
import TodoItemList from "./components/TodoItemList";
import TodoFilter from "./components/TodoFilter";

function App() {
  return (
    <div className="app">
      <TodoContextProvider>
        <div className="wrapper">
          <Input />
          <TodoItemList />
          <TodoFilter />
        </div>
      </TodoContextProvider>
    </div>
  );
}

export default App;
