import styles from '../styles/TodoInput.module.scss'
import { useForm } from "react-hook-form"
import uuid from 'uuid-random'

const TodoInput = ({ context }) => {
  let { addTodo, filterTodo, updateProgress } = context // use TodoContext
  const { register, handleSubmit } = useForm()
  const handleAddTodo = (data, e) => {
    // random todo id
    const todoID = uuid()
    // send todo data
    const bodyData = { id: todoID, title: data.title, completed: false }
    fetch('https://my-json-server.typicode.com/sarinyaw/my-todo/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(data => {
        e.target.reset()
        console.log('Success:', data)
        // add todo in todo state
        addTodo(bodyData)
        // update progress complete in progress state
        updateProgress()
        // filter all todo list from filter state
        filterTodo("FILTER_ALL")
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  return (
    <form className={styles.inputTodo} onSubmit={handleSubmit(handleAddTodo)}>
      <label htmlFor="title"></label>
      <input className={styles.newTodo} id="title" type="text" name="title" placeholder="Add your todo..." ref={register({ required: true })} />
    </form>
  )
}

export default TodoInput;