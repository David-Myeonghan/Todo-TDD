import "./TodoItemList.css";
import { useTodoContext } from "../context/useTodoContext";
import TodoItem from "./TodoItem";
import React, { ChangeEvent } from "react";
import { modifyTotoItem, getTodos, deleteTodoItem } from "../firebase";
import { TodoItemType } from "../context/TodoContext";

export default function TodoItemList() {
  const { todoList, setTodoList } = useTodoContext();

  const handleItemDoneClick = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const checked = e.target.checked;
    const item = todoList.find((todo) => todo.id === id);
    const modified = { ...item, isDone: checked } as TodoItemType;
    modifyTotoItem(modified);
    // Refresh
    getTodos().then((res) => setTodoList(res));
  };

  const handleEnterPressed = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
  ) => {
    const value = (e.target as HTMLInputElement).value;
    if (value !== "") {
      const updatedList = todoList.map((todo) =>
        todo.id === id ? { ...todo, title: value } : todo,
      );
      const item = todoList.find((todo) => todo.id === id);
      const modified = { ...item, title: value } as TodoItemType;
      modifyTotoItem(modified);
      // Refresh
      getTodos().then((res) => setTodoList(res));
    }
  };

  const handleRemoveClick = (id: string) => {
    deleteTodoItem(id);
    // Refresh
    getTodos().then((res) => setTodoList(res));
  };

  return (
    <div className="item-list">
      {todoList?.map((item) => (
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
