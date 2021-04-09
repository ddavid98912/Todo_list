
import React, {useState, useRef, useEffect} from 'react';
import TodoList from "./TodoList";
//clasa pentru id-uri diferite
//import uuid from 'uuid/v4';
const { v4: uuidv4 } = require('uuid');

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //destructoring, remember every state before rendering 
  //todos pentru cate todo avem, al doilea parametru pentru update todos
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  //ca sa dam load la todos
  useEffect(() =>{
    //parse o sa converteasca in array
    const storedTodso = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodso) setTodos(storedTodso)
  }, [])
  //mai sus pun un emptyArray ca sa il apeleze o singura data



  //ca sa retina local
  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return 
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  function handleCLearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }




  return (
    <>
    <TodoList todos = {todos} toggleTodo ={toggleTodo}/>
    <input ref = {todoNameRef}  type="text"/>
    <button onClick = {handleAddTodo}>Add to do</button>
    <button onClick = {handleCLearTodos}>clear completed todos</button>
    <div>{todos.filter(todo => !todo.complete).length}  left to do</div>

    </>
  )
}

export default App;
