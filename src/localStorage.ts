import { TodoList } from "./TodoContext";

export const saveLocalStorage = ({
  key = "todos",
  value,
}: {
  key: string;
  value: TodoList;
}) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key || "todos");
  if (!item) return;
  return JSON.parse(item);
};
