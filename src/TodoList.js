import React from 'react'
import Todo from './Todo' 

export default function TodoList({todos, toggleTodo}) {
    return (
        todos.map(todo  => {
            //key o sa modifice doar elementele ce trebuie modificate din array, nu tot array-ul
            return <Todo key = {todo.id} toggleTodo = {toggleTodo} todo = {todo}/>
        })
    )
}
