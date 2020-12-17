import React, { createContext, useReducer } from "react"

export const TodoContext = createContext({})

const initialState = {
  todos: [],
  filters: [],
  progress: 0
}

const TodoReducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state, // copy state 
        todos: [
          ...state.todos,
          action.payload
        ]
      }
    case "UPDATE_TODO":
      const myFunction = (value) => {
        if (value.id === action.payload.id) {
          value.title = action.payload.title
          value.completed = action.payload.completed
        }
        return value
      }
      return {
        ...state,
        todos: state.todos.map(myFunction)
      }
    case "DELETE_TODO":
      return {
        ...state, // copy state 
        todos: [
          ...state.todos.slice(0, action.index),
          ...state.todos.slice(action.index + 1)
        ]
      }
    case "FILTER_ALL":
      return {
        ...state, // copy state 
        filters: {
          status: "All",
          list: state.todos,
          count: state.todos.length
        }
      }
    case "FILTER_DONE":
      return {
        ...state, // copy state 
        filters: {
          status: "Done",
          list: state.todos.filter(value => value.completed),
          count: state.todos.filter(value => value.completed).length
        }
      }
    case "FILTER_UNDONE":
      return {
        ...state, // copy state 
        filters: {
          status: "Undone",
          list: state.todos.filter(value => !value.completed),
          count: state.todos.filter(value => !value.completed).length
        }
      }
    case "PROGRESS_DONE":
      return {
        ...state, // copy state 
        progress: {
          completed: state.todos.filter(value => value.completed).length,
          length: (Math.round(100 * (state.todos.filter(value => value.completed).length / state.todos.length) * 100) / 100)
        }
      }
  }
}
export const TodoProvider = ({ children }) => {
  const [todoState, todoDispatch] = useReducer(
    TodoReducer,
    initialState
  )

  const { todos, filters, progress } = todoState

  const addTodo = payload =>
    todoDispatch({ type: "ADD_TODO", payload })

  const updateTodo = payload =>
    todoDispatch({ type: "UPDATE_TODO", payload })

  const deleteTodo = index =>
    todoDispatch({ type: "DELETE_TODO", index })

  const filterTodo = (type) =>
    todoDispatch({ type: type })

  const updateProgress = () =>
    todoDispatch({ type: "PROGRESS_DONE" })

  return (
    <TodoContext.Provider value={{ todos, filters, progress, addTodo, updateTodo, deleteTodo, filterTodo, updateProgress }}>
      {children}
    </TodoContext.Provider>
  )
}
