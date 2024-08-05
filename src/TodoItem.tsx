import { TodoItemType } from "./TodoContext";
import { useEffect, useRef, useState } from "react";
import { useTodoContext } from "./useTodoContext";
import { saveLocalStorage } from "./localStorage";
import classNames from "classnames/bind";
import styles from "./TodoItem.module.css";

const cx = classNames.bind(styles);

interface TodoItemProp {
  item: TodoItemType;
}

export default function TodoItem({ item }: TodoItemProp) {
  const { setTodoList } = useTodoContext();
  const [itemTitleValue, setItemTitleValue] = useState(item.title);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodoList((prev) => {
        const updatedList = prev.map((todo) =>
          todo.id === item.id ? { ...todo, title: itemTitleValue } : todo,
        );
        saveLocalStorage({
          key: "todos",
          value: updatedList,
        });
        return updatedList;
      });
      setIsEditMode(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
    }
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
        onChange={(e) => {
          const checked = e.target.checked;
          setTodoList((prevTodos) => {
            const updatedList = prevTodos.map((todo) =>
              todo.id === item.id ? { ...todo, isDone: checked } : todo,
            );
            saveLocalStorage({ key: "todos", value: updatedList });
            return updatedList;
          });
        }}
      />
      <label
        className={cx({
          "item-label-hidden": isEditMode,
          "item-label": !isEditMode,
          "strike-through": item.isDone,
        })}
        htmlFor={item.id}
      >
        {itemTitleValue}
      </label>
      <input
        ref={inputRef}
        id={item.id}
        type="text"
        className={cx({
          "item-input": isEditMode,
          "item-input-hidden": !isEditMode,
        })}
        value={itemTitleValue}
        onChange={(e) => setItemTitleValue(e.target.value)}
        onKeyDown={handleEnterPressed}
        onBlur={() => setIsEditMode(false)}
      />
      <div className={cx("button-box")}>
        {isHovered ? (
          <button
            onClick={() =>
              setTodoList((prev) => {
                const updatedList = prev.filter((todo) => todo.id !== item.id);
                saveLocalStorage({ key: "todos", value: updatedList });
                return updatedList;
              })
            }
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
