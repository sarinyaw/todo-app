import React, { useState } from "react"
import styles from '../styles/TodoList.module.scss'
import TodoEdit from "./TodoEdit"

const TodoList = ({ context }) => {
  let { todos, filters, deleteTodo, updateTodo, filterTodo, updateProgress } = context // use TodoContext
  const [isOpenEdit, setOpenEdit] = useState(todos.map(() => false)) // define state for open/close edit input form
  const [isOpenMenu, setOpenMenu] = useState(todos.map(() => false)) // define state for open/close menu (edit/delete)

  const filterList = {
    'All': 'FILTER_ALL',
    'Done': 'FILTER_DONE',
    'Undone': 'FILTER_UNDONE',
  }

  // check a todo
  const checkTodo = (todo) => {
    // send title's status
    const bodyData = { completed: !todo.completed }
    fetch('https://my-json-server.typicode.com/sarinyaw/my-todo/todos/' + todo.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        // update todo in todo state
        updateTodo({ id: todo.id, title: todo.title, completed: !todo.completed })
        // update progress complete in progress state
        updateProgress()
        // filter todo with status list from filter state
        filterTodo(filterList[filters.status])
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  // delete a todo
  const handleDelete = (index, id) => {
    setOpenMenu(todos.map(() => false))
    fetch('https://my-json-server.typicode.com/sarinyaw/my-todo/todos/' + id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        // delete todo in todo state
        deleteTodo(index)
        // update progress complete in progress state
        updateProgress()
        // filter todo with status list from filter state
        filterTodo(filterList[filters.status])
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  // open/close menu(edit/delete)
  const toggleMenu = (index, status) => {
    const menu = [...isOpenMenu];
    menu[index] = status;
    setOpenMenu(menu)
  }

  // open edit input form
  const openEditForm = (index) => {
    // open edit form
    const edit = [...isOpenEdit];
    edit[index] = true;
    setOpenEdit(edit)
    // close menu
    toggleMenu(index, false)
  }

  return (
    <div className={styles.todoList}>
      {filters.list && filters.list.map((todo, index) => {
        return (
          isOpenEdit[index] ? (
            <div key={todo.id} className={styles.todoBar}>
              <TodoEdit
                todo={todo}
                index={index}
                todos={todos}
                updateTodo={updateTodo}
                setOpenEdit={setOpenEdit}
                setOpenMenu={setOpenMenu}
              />
            </div>
          ) :
            (<div key={todo.id} className={styles.todoBar}>
              { todo.completed ? (
                <div className={styles.todo}>
                  <span className={`${styles.checkbox} ${styles.checked}`} onClick={() => checkTodo(todo)}><ion-icon name="checkmark-outline"></ion-icon></span>
                  <p className={styles.done} onClick={() => checkTodo(todo)}>{todo.title}</p>
                </div>
              ) : (
                  <div className={styles.todo}>
                    <span className={`${styles.checkbox} ${styles.unchecked}`} onClick={() => checkTodo(todo)}></span>
                    <p className={styles.undone} onClick={() => checkTodo(todo)}>{todo.title}</p>
                  </div>
                )}
              <div className={styles.menuBar}>
                <ion-icon name="ellipsis-horizontal" onClick={() => toggleMenu(index, isOpenMenu[index] = !isOpenMenu[index])}></ion-icon>
                {isOpenMenu[index] && (
                  <ul className={styles.menu}>
                    <li className={styles.editTodo} onClick={() => openEditForm(index)}>Edit</li>
                    <li className={styles.deleteTodo} onClick={() => handleDelete(index, todo.id)}>Delete</li>
                  </ul>
                )
                }
              </div>
            </div>)
        )
      })
      }
    </div>
  )

}

export default TodoList