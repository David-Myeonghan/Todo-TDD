import "./Input.css";
import React, { useCallback, useState } from "react";
import { useTodoContext } from "../context/useTodoContext";
import { getLocalStorageItem, saveLocalStorage } from "../utils/localStorage";
import { modifyTotoItem, getTodos } from "../firebase";

export default function Input() {
  const { todoList, setTodoList } = useTodoContext();
  const [inputValue, setInputValue] = useState("");

  // useCallback
  const handleEnterPressed = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue !== "") {
        const id = todoList.length.toString();
        const newTodo = {
          id,
          title: inputValue,
          isDone: false,
        };
        modifyTotoItem(newTodo).then((res) => console.log(res));
        setInputValue("");
        // onSuccess Refresh - get data from server DB
        getTodos().then((res) => setTodoList(res));
      }
    },
    [inputValue, todoList],
  );

  // onChange 없이 defaultValue 이용 가능 - one way data binding
  const handleNewItemTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = (e.target as HTMLInputElement).value;
      setInputValue(value);
    },
    [],
  );

  return (
    <input
      className="todoInput"
      type="text"
      placeholder="What needs to be done?"
      onKeyDown={handleEnterPressed}
      value={inputValue}
      onChange={handleNewItemTextChange}
    />
  );
}
