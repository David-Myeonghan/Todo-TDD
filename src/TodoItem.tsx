import "./TodoItem.css";
import { TodoItemType } from "./TodoContext";
import { useEffect, useRef, useState } from "react";

interface TodoItemProp {
  item: TodoItemType;
}

export default function TodoItem({ item }: TodoItemProp) {
  const [itemValue, setItemValue] = useState(item.title);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
      <label
        className={isEditMode ? "item-label-hidden" : "item-label"}
        htmlFor={item.id}
      >
        {itemValue}
      </label>
      <input
        ref={inputRef}
        id={item.id}
        type="text"
        className={isEditMode ? "item-input" : "item-input-hidden"}
        value={itemValue}
        onChange={(e) => setItemValue(e.target.value)}
        onBlur={() => setIsEditMode(false)}
      />
      {isHovered ? (
        <button className="item-close-button" data-testid="close-button">
          X
        </button>
      ) : null}
    </div>
  );
}
