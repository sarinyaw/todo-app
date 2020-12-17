import styles from '../styles/TodoEdit.module.scss'
import { useForm } from "react-hook-form"

const TodoEdit = ({ todo, index, todos, updateTodo, setOpenEdit, setOpenMenu }) => {
  const { register, handleSubmit } = useForm()

  // update a todo
  const handleUpdateTitle = (data, e) => {
    // send title's todo
    const bodyData = { title: data.title }
    fetch('http://localhost:3001/todos/' + todo.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(data => {
        e.target.reset()
        console.log('Success:', data)
        // update todo in todo state
        updateTodo({ index: index, id: todo.id, title: data.title, completed: todo.completed })
        // set state for close edit input & menu
        setOpenEdit(todos.map(() => false))
        setOpenMenu(todos.map(() => false))
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  return (
    <form id={`edit-form-${index}`} value={todo.id} className={styles.inputTodo} onSubmit={handleSubmit(handleUpdateTitle)}>
      <label htmlFor="title"></label>
      <input id="title" type="text" name="title" defaultValue={todo.title} placeholder="Edit your todo..." ref={register({ required: true })} autoFocus />
      <input type="submit" className={styles.saveButton} value="Save" />
    </form>
  )
}

export default TodoEdit;