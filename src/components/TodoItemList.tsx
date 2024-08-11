import "./TodoItemList.css";
import { useTodoContext } from "../context/useTodoContext";
import TodoItem from "./TodoItem";
import React, { ChangeEvent } from "react";
import { getLocalStorageItem, saveLocalStorage } from "../utils/localStorage";

export default function TodoItemList() {
  const { todoList, setTodoList } = useTodoContext();

  const handleItemDoneClick = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const checked = e.target.checked;
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isDone: checked } : todo,
    );
    saveLocalStorage({ key: "todos", value: updatedList });
    // Refresh
    setTodoList(getLocalStorageItem("todos"));
  };

  const handleEnterPressed = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
  ) => {
    const value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter" && value !== "") {
      const updatedList = todoList.map((todo) =>
        todo.id === id ? { ...todo, title: value } : todo,
      );
      saveLocalStorage({ key: "todos", value: updatedList });
      // Refresh
      setTodoList(getLocalStorageItem("todos"));
    }
  };

  const handleRemoveClick = (id: string) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    saveLocalStorage({ key: "todos", value: updatedList });
    // Refresh
    setTodoList(getLocalStorageItem("todos"));
  };

  return (
    <div className="item-list">
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onItemDoneClick={handleItemDoneClick}
          onEnterPressed={handleEnterPressed}
          onRemoveClick={handleRemoveClick}
        />
      ))}
    </div>
  );
}
