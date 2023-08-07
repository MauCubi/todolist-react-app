import { createSlice } from '@reduxjs/toolkit';
import { ToDo } from '../../types';
import { v4 as uuidv4 } from 'uuid';


export interface SliceTodo {
    todos: ToDo[],
    activeTodo: ToDo | null
}

const initialState: SliceTodo = {
    todos: [],
    activeTodo: null
  }

export const todosSlice = createSlice({
    name: 'todo',
    initialState,

    reducers: {
        setActiveTodo: (state, action ) => {
            state.activeTodo = action.payload
        },
        setCompleted: ( state, action ) => {            
            state.todos[action.payload].status = !state.todos[action.payload].status
            state.todos[action.payload].status
                ?state.todos[action.payload].completedDate = new Date()
                :state.todos[action.payload].completedDate = undefined 

            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        setAllComplete: ( state ) => {            
            state.todos.map( todo => (
                todo.status = true,
                todo.completedDate = new Date()                
            ))

            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        setAllIncomplete: ( state ) => {
            state.todos.map( todo => (
                todo.status = false,
                todo.completedDate = undefined 
            ))

            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        getTodos: (state, /* action */ ) => {
            const todoList: ToDo[] = JSON.parse(localStorage.getItem('todos')!)            
            if (todoList) {                
                state.todos = todoList
            } 
        },
        addTodo: ( state, { payload } ) => {
            
            const todo: ToDo = {
                id: uuidv4(),
                title: payload.title,
                dueDate: payload.dueDate? payload.dueDate : null,
                status: false,
            }

            state.todos.push(todo)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        deleteTodo: (state, { payload }) => {            
            state.todos = state.todos.filter( todo => todo.id !== payload)            
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        updateTodo: (state, { payload }) => {
            state.todos.map( todo => {
                if (todo.id === state.activeTodo?.id) {
                    todo.title = payload.title
                    todo.dueDate = payload.dueDate? payload.dueDate : null
                }
            })

            localStorage.setItem('todos', JSON.stringify(state.todos))
        }
    }    
});


export const { 
    setActiveTodo, 
    getTodos, 
    setCompleted,
    setAllComplete,
    setAllIncomplete,
    addTodo,
    deleteTodo,
    updateTodo

} = todosSlice.actions;