import {useTodoContext} from "./useTodoContext";

export default function TodoItemList() {
    const {todoList} = useTodoContext();
    console.log(todoList)

    return (
        <div className='item-list'>
            {todoList.map(item => (<div className='item' key={item.title}><span>{item.title}</span></div>))}
        </div>
    )
}