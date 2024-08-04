import "./TodoItem.css";
import { TodoItemType } from "./TodoContext";
import { useEffect, useRef, useState } from "react";
import { useTodoContext } from "./useTodoContext";
import { saveLocalStorage } from "./localStorage";

interface TodoItemProp {
  item: TodoItemType;
}

export default function TodoItem({ item }: TodoItemProp) {
  const { setTodoList } = useTodoContext();
  const [itemTitleValue, setItemTitleValue] = useState(item.title);
  const [isItemDone, setIsItemDone] = useState(item.isDone);
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
      className="item"
      aria-label="button-container"
      key={item.title}
      onDoubleClick={() => setIsEditMode(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        className="item-checkbox"
        type="checkbox"
        checked={isItemDone}
        onChange={() => {
          setIsItemDone(!isItemDone);
        }}
      />
      <label
        className={isEditMode ? "item-label-hidden" : "item-label"}
        htmlFor={item.id}
      >
        {itemTitleValue}
      </label>
      <input
        ref={inputRef}
        id={item.id}
        type="text"
        className={isEditMode ? "item-input" : "item-input-hidden"}
        value={itemTitleValue}
        onChange={(e) => setItemTitleValue(e.target.value)}
        onKeyDown={handleEnterPressed}
        onBlur={() => setIsEditMode(false)}
      />
      {isHovered ? (
        <button
          onClick={() =>
            setTodoList((prev) => {
              const updatedList = prev.filter((todo) => todo.id !== item.id);
              saveLocalStorage({ key: "todos", value: updatedList });
              return updatedList;
            })
          }
          className="item-close-button"
          data-testid="close-button"
        >
          X
        </button>
      ) : null}
    </div>
  );
}
