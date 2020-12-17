import React, { useState } from "react"
import styles from '../styles/Filter.module.scss'

const Filter = ({ context }) => {
  let { filters, filterTodo } = context // use TodoContext
  const [isMenuOpen, setOpenMenu] = useState(false) // define state for open/close menu
  const selectFilter = (status) => {
    filterTodo(status) // filter todo list from filter state
    setOpenMenu(false) // close menu
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filterBar} onClick={() => setOpenMenu(!isMenuOpen)}>
        <span>{filters.status}</span>
        <span><ion-icon name="chevron-down-outline"></ion-icon></span>
      </div>
      { isMenuOpen && (
        <ul className={styles.filterMenu}>
          <li onClick={() => {
            selectFilter('FILTER_ALL')
          }}>All</li>
          <li onClick={() => {
            selectFilter('FILTER_DONE')
          }}>Done</li>
          <li onClick={() => {
            selectFilter('FILTER_UNDONE')
          }}>Undone</li>
        </ul>
      )
      }
    </div>
  )
}
export default Filter