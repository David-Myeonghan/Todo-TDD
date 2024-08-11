import { TodoItemType } from "../context/TodoContext";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTodoContext } from "../context/useTodoContext";
import { getLocalStorageItem, saveLocalStorage } from "../utils/localStorage";
import classNames from "classnames/bind";
import styles from "./TodoItem.module.css";

const cx = classNames.bind(styles);

interface TodoItemProp {
  item: TodoItemType;
}

export default function TodoItem({ item }: TodoItemProp) {
  const { todoList, setTodoList } = useTodoContext();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // TODO: 함수들 아이템 많아도 한번만 생성되도록 변경

  const handleItemDoneClick = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const updatedList = todoList.map((todo) =>
      todo.id === item.id ? { ...todo, isDone: checked } : todo,
    );
    saveLocalStorage({ key: "todos", value: updatedList });
    // Update
    setTodoList(getLocalStorageItem("todos"));
  };

  const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (e.key === "Enter" && value !== "") {
      const updatedList = todoList.map((todo) =>
        todo.id === item.id ? { ...todo, title: value } : todo,
      );
      saveLocalStorage({ key: "todos", value: updatedList });
      setIsEditMode(false);

      // Refresh
      setTodoList(getLocalStorageItem("todos"));
    }
  };

  const handleRemoveClick = () => {
    const updatedList = todoList.filter((todo) => todo.id !== item.id);
    saveLocalStorage({ key: "todos", value: updatedList });
    // Refresh
    setTodoList(getLocalStorageItem("todos"));
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div
      className={cx("item")}
      aria-label="button-container"
      key={item.title}
      onDoubleClick={() => setIsEditMode(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        className={cx("item-checkbox")}
        type="checkbox"
        checked={item.isDone}
        onChange={handleItemDoneClick}
      />
      <label
        data-testid={"todoItem"}
        className={cx({
          "item-label-hidden": isEditMode,
          "item-label": !isEditMode,
          "strike-through": item.isDone,
        })}
        htmlFor={item.id}
      >
        {item.title}
      </label>
      <input
        ref={inputRef}
        id={item.id}
        type="text"
        className={cx({
          "item-input": isEditMode,
          "item-input-hidden": !isEditMode,
        })}
        defaultValue={item.title}
        onKeyDown={handleEnterPressed}
        onBlur={() => setIsEditMode(false)}
      />
      <div className={cx("button-box")}>
        {isHovered ? (
          <button
            onClick={handleRemoveClick}
            className={cx("item-close-button")}
            data-testid="close-button"
          >
            X
          </button>
        ) : null}
      </div>
    </div>
  );
}
