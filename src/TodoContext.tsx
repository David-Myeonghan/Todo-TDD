import React, {createContext, SetStateAction, useEffect, useMemo, useState} from "react"
import {getLocalStorageItem} from "./localStorage";

type TodoItem = {
    title: string;
    isDone: boolean;
}

type TodoList = Array<TodoItem>

type TodoContextType = {
    todoList: TodoList,
    setTodoList: React.Dispatch<SetStateAction<TodoList>>,
}

export const TodoContext = createContext<TodoContextType | []>([]);

export const TodoContextProvider = ({children}: { children: React.ReactNode }) => {
    const [todoList, setTodoList] = useState<TodoList>([]);

    useEffect(() => {
        const storageTodos = getLocalStorageItem('todos');
        setTodoList(storageTodos)

    }, [])


    const value = useMemo(() => ({todoList, setTodoList}), [todoList]);

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}