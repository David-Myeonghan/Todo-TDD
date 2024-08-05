import styles from "./TodoFilter.module.css";
import classNames from "classnames/bind";
import { useTodoContext } from "../context/useTodoContext";
import { getLocalStorageItem, saveLocalStorage } from "../utils/localStorage";
import { TodoItemType } from "../context/TodoContext";

const cx = classNames.bind(styles);

export default function TodoFilter() {
  const { todoList, setTodoList } = useTodoContext();

  if (todoList.length === 0) return null;

  // console.log(getLocalStorageItem("todos"));

  return (
    <div className={cx("filter-box")}>
      <div>
        <button
          onClick={() =>
            setTodoList((prev) => {
              const doneItemList = prev.filter((item) => item.isDone === false);
              saveLocalStorage({ key: "todos", value: doneItemList });
              return doneItemList;
            })
          }
        >
          Clear completed
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            setTodoList(getLocalStorageItem("todos"));
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            const activeItemList = getLocalStorageItem("todos").filter(
              (item: TodoItemType) => item.isDone === false,
            );
            setTodoList(activeItemList);
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            const doneItemList = getLocalStorageItem("todos").filter(
              (item: TodoItemType) => item.isDone === true,
            );
            setTodoList(doneItemList);
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
