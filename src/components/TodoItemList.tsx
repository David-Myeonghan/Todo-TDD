import "./TodoItemList.css";
import { useTodoContext } from "../context/useTodoContext";
import TodoItem from "./TodoItem";

export default function TodoItemList() {
  const { todoList } = useTodoContext();

  return (
    <div className="item-list">
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </div>
  );
}
