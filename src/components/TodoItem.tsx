import { TodoItemType } from "../context/TodoContext";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./TodoItem.module.css";

const cx = classNames.bind(styles);

interface TodoItemProp {
  item: TodoItemType;
  onItemDoneClick: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onEnterPressed: (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
  ) => void;
  onRemoveClick: (id: string) => void;
}

export default function TodoItem({
  item,
  onItemDoneClick,
  onEnterPressed,
  onRemoveClick,
}: TodoItemProp) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // UI 관련은 item 내부에서 관리

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
        onChange={(e) => onItemDoneClick(e, item.id)}
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnterPressed(e, item.id);
            setIsEditMode(false);
          }
        }}
        onBlur={() => {
          if (inputRef.current) {
            inputRef.current.value = item.title;
          }
          setIsEditMode(false);
        }}
      />
      <div className={cx("button-box")}>
        {isHovered ? (
          <button
            onClick={(_e) => onRemoveClick(item.id)}
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
