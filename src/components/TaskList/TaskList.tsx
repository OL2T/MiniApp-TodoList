import styles from './taskList.module.scss'
import './taskList.module.scss'
import { Todo } from '../@types/todos.type'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  removeTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, removeTodo } =
    props

  return (
    <div className='app-item'>
      <h2>{doneTaskList ? 'Done' : 'Upcoming'}</h2>
      <div className={styles.taskItems}>
        {todos.map((todo) => (
          <div className={styles.taskItem} key={todo.id}>
            <div className={styles.taskItemTitle}>
              <input
                id={todo.id}
                type='checkbox'
                checked={todo.done}
                onChange={(e) => handleDoneTodo(todo.id, e.target.checked)}
              />
              <label
                htmlFor={todo.id}
                className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}
              >
                {todo.name}
              </label>
            </div>
            <div className={styles.actionsGroup}>
              <button
                className={`${styles.btnEdit} ${styles.btn}`}
                onClick={() => startEditTodo(todo.id)}
              >
                🔧
              </button>
              <button
                className={`${styles.btnDelete} ${styles.btn}`}
                onClick={() => removeTodo(todo.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
