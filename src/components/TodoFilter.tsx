import styles from "./TodoFilter.module.css";
import classNames from "classnames/bind";
import { useTodoContext } from "../context/useTodoContext";
import { getLocalStorageItem, saveLocalStorage } from "../utils/localStorage";
import { TodoItemType } from "../context/TodoContext";
import { useCallback } from "react";

const cx = classNames.bind(styles);

export default function TodoFilter() {
  const { todoList, setTodoList } = useTodoContext();

  const handleClearCompletedClick = () => {
    const undoneItemList = todoList.filter((item) => item.isDone === false);
    saveLocalStorage({ key: "todos", value: undoneItemList });
    // Update from DB
    setTodoList(getLocalStorageItem("todos"));
  };

  const handleAllClick = useCallback(() => {
    setTodoList(getLocalStorageItem("todos"));
  }, []);

  const handleActiveClick = useCallback(() => {
    const undoneItemList = getLocalStorageItem("todos").filter(
      (item: TodoItemType) => item.isDone == false,
    );
    setTodoList(undoneItemList);
  }, []);

  const handleCompletedClick = useCallback(() => {
    const doneItemList = getLocalStorageItem("todos").filter(
      (item: TodoItemType) => item.isDone === true,
    );
    setTodoList(doneItemList);
  }, []);

  if (todoList.length === 0) return null;

  return (
    <div className={cx("filter-box")}>
      <div>
        <button onClick={handleClearCompletedClick}>Clear completed</button>
      </div>

      <div>
        <button onClick={handleAllClick}>All</button>
        <button onClick={handleActiveClick}>Active</button>
        <button onClick={handleCompletedClick}>Completed</button>
      </div>
    </div>
  );
}
