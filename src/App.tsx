import React from "react";
import "./App.css";
import { TodoContextProvider } from "./TodoContext";
import Input from "./Input";
import TodoItemList from "./TodoItemList";

function App() {
  return (
    <div className="app">
      <TodoContextProvider>
        <div className="wrapper">
          <Input />
          <TodoItemList />
        </div>
      </TodoContextProvider>
    </div>
  );
}

export default App;
