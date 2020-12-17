import styles from '../styles/Progress.module.scss'

const Progress = ({ context }) => {
  let { progress } = context // use TodoContext
  return (
    <div className={styles.progress}>
      <h2 className={styles.title}>Progress</h2>
      <span className={styles.progressBar}>
        <span className={styles.progressLine} style={{ width: progress.length + '%' }}></span>
      </span>
      <p>{progress.completed} completed</p>
    </div>
  )
}
export default Progress