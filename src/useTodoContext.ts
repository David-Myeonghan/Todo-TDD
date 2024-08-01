import { useContext } from "react"

import { TodoContext } from "./TodoContext"

export const useTodoContext = () => {
    const context = useContext(TodoContext);

    if (!context) {
        throw new Error('Cannot find the context');
    }

    return context;
}