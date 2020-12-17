import React, { useEffect, useState } from "react"
import styles from '../styles/Todo.module.scss'
import Progress from './Progress'
import Filter from './Filter'
import TodoList from './TodoList'
import TodoInput from "./TodoInput"

const Todo = ({ context }) => {
  let { addTodo, filterTodo, updateProgress } = context // use TodoContext
  const [isFirstFetch, setFirstFetch] = useState(false) // define state for first fetch data

  useEffect(() => {
    // Fetch todo data from API when start
    if (!isFirstFetch) {
      setFirstFetch(true)
      fetch(`https://my-json-server.typicode.com/sarinyaw/my-todo/todos`)
        .then((res) => res.json())
        .then((data) => {
          // add todo in todo state
          data.map((value) => addTodo({ id: value.id, title: value.title, completed: value.completed }))
          // update progress complete in progress state
          updateProgress()
          // filter todo list from filter state
          filterTodo("FILTER_ALL")
        })
    }
  }, [addTodo, filterTodo, isFirstFetch, updateProgress])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Progress context={context} />
        <div className={styles.taskMenu}>
          <h1 className={styles.title}>Tasks</h1>
          <Filter context={context} />
        </div>
        <TodoList context={context} />
        <TodoInput context={context} />
      </div>
    </div>
  )
}
export default Todo