import styles from "./TodoFilter.module.css";
import classNames from "classnames/bind";
import { useTodoContext } from "../context/useTodoContext";
import { saveLocalStorage } from "../utils/localStorage";

const cx = classNames.bind(styles);

export default function TodoFilter() {
  const { todoList, setTodoList } = useTodoContext();

  if (todoList.length === 0) return null;

  return (
    <div className={cx("filter-box")}>
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
  );
}
