import { useState } from 'react'
import styles from './TasksPanel.module.css'

export default function TasksPanel({ member, tasks, onToggleTask, onAddTask }) {
  const [newTask, setNewTask] = useState('')

  if (!member) {
    return (
      <div className={styles.tasksPanel}>
        <p className={styles.empty}>Select a member to see their tasks</p>
      </div>
    )
  }

  const doneCount = tasks.filter((task) => task.done).length

  function handleSubmit(e) {
    e.preventDefault()
    onAddTask(newTask)
    setNewTask('')
  }

  return (
    <div className={styles.tasksPanel}>
      <h3 className={styles.title}>Tasks of {member.name}</h3>

      <p className={styles.counter}>
        {doneCount}/{tasks.length} done
      </p>

      {tasks.length === 0 ? (
        <p className={styles.empty}>No tasks yet</p>
      ) : (
        <div className={styles.tasks}>
          {tasks.map((task) => (
            <label
              key={task.id}
              className={`${styles.task} ${task.done ? styles.done : ''}`}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggleTask(task.id)}
              />
              <span>{task.title}</span>
            </label>
          ))}
        </div>
      )}

      <form className={styles.quickAdd} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
