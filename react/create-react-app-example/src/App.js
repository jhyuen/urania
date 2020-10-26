import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

const { v4: uuidv4 } = require('uuid');				// uuidv4 generates random ids 
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  	const [todos, setTodos] = useState([])		// state
	const todoNameRef = useRef()
	
	// getting from the local storage (display after the page was updated)
	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))		// convert into array
		if (storedTodos) setTodos(storedTodos)
	}, [])	// empty array never changes, so it will be called once and never recalled
	
	// storing to the local storage
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])	// array of dependencies
	
	// toggle a checkbox
	function toggleTodo(id) {
		const newTodos = [...todos]		// never change directly a state variable. So, create a copy of the list first
		const todo = newTodos.find(todo => todo.id === id)
		todo.complete = !todo.complete
		setTodos(newTodos)
	}
	
	function handleAddTodo(e) {			// 'e' = event 
		const name = todoNameRef.current.value
		if (name === '') return
		setTodos(prevTodos => {
			return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
		})
		todoNameRef.current.value = null			// clear the input
	}
	
	function handleClearTodos() {
		const newTodos = todos.filter(todo => !todo.complete)
		setTodos(newTodos)
	}

	return (
	<>
		<TodoList todos={todos} toggleTodo={toggleTodo}/>
		<input ref={todoNameRef} type="text" />
		<button onClick={handleAddTodo}>Add Todo</button>
		<button onClick={handleClearTodos}>Clear Completed Todos</button>
		<div>{todos.filter(todo => !todo.complete).length} left to do</div>
	</>
	)
}

export default App;
