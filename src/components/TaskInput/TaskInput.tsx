import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../@types/todos.type'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className={styles.taskInputContainer + ' app-item'}>
      <h2 className={styles.title}>Todo List TypeScript</h2>
      <form action='' className={styles.formTaskIput} onSubmit={handleSubmit}>
        <div className={styles.groupContainer}>
          <label htmlFor='task-input' className={styles.hidden}>
            ABC
          </label>
          <input
            id='task-input'
            type='text'
            placeholder='Take a note ...'
            value={currentTodo ? currentTodo.name : name}
            onChange={onChangeInput}
          />
        </div>
        <button type='submit' className={styles.iconAdd}>
          {currentTodo ? '✔️' : '✚'}
        </button>
      </form>
    </div>
  )
}
