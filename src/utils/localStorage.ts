import { TodoList } from "../context/TodoContext";

export const saveLocalStorage = ({
  key = "todos",
  value,
}: {
  key: string;
  value: TodoList;
}) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = <T>(key: string, defaultValue?: T) => {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  return JSON.parse(item);
  // try-catch 사용해서 catch 에서 return defaultValue;
};
