import './Input.css';
import React, {useState} from 'react';
import {useTodoContext} from "./useTodoContext";
import {saveLocalStorage} from "./localStorage";

export default function Input() {
    const {todoList, setTodoList} = useTodoContext();
    const [inputValue, setInputValue] = useState('')

    const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newTodo = {title: inputValue, isDone: false};
            setTodoList(prev => {
                    saveLocalStorage({key: 'todos', value: [...prev, newTodo]})
                    return [...prev, newTodo];
                }
            );
            setInputValue('');
        }
    }

    return (
        <input className='todoInput'
               placeholder='What needs to be done?'
               onKeyDown={handleEnterPressed}
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
        />)
}