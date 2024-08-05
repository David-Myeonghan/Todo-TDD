import "./Input.css";
import React, { useState } from "react";
import { useTodoContext } from "../context/useTodoContext";
import { saveLocalStorage } from "../utils/localStorage";

export default function Input() {
  const { todoList, setTodoList } = useTodoContext();
  const [inputValue, setInputValue] = useState("");

  const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodoList((prev) => {
        const id = prev.length.toString();
        const newTodo = { id, title: inputValue, isDone: false };
        saveLocalStorage({ key: "todos", value: [...prev, newTodo] });
        return [...prev, newTodo];
      });
      setInputValue("");
    }
  };

  return (
    <input
      className="todoInput"
      type="text"
      placeholder="What needs to be done?"
      onKeyDown={handleEnterPressed}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
