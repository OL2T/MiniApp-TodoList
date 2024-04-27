import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import './styles.scss'
import { useEffect, useState } from 'react'
import { Todo } from '../@types/todos.type'

// interface HandleNewTodo {
//   (todos: Todo[]): Todo[]
// }

type HandleNewTodo = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodo: HandleNewTodo) => {
  const todoString = localStorage.getItem('todos')
  const todoObj: Todo[] = JSON.parse(todoString || '[]')
  const newTodosObj = handleNewTodo(todoObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')
    setTodos(todoObj)

    return () => {}
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((todoObj) => [...todoObj, todo])

    syncReactToLocal((todoObj: Todo[]) => [...todoObj, todo])
  }

  // console.log(todos)

  const handleDoneTodos = (id: string, done: boolean) => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        } else {
          return todo
        }
      })
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((todoObj) => {
      if (todoObj) return { ...todoObj, name }
      return null
    })
  }

  const finishEditTodo = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }

    setTodos(handler)
    setCurrentTodo(null)

    syncReactToLocal(handler)
  }

  const removeTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (todoObj: Todo[]) => {
      const findIndexTodo = todoObj.findIndex((todo) => todo.id === id)
      if (findIndexTodo > -1) {
        const result = [...todoObj]
        result.splice(findIndexTodo, 1)
        return result
      }
      return todoObj
    }
    setTodos(handler)

    syncReactToLocal(handler)
  }

  return (
    <div className={styles.App + ' todo-list-app-items'}>
      <TaskInput
        addTodo={addTodo}
        currentTodo={currentTodo}
        editTodo={editTodo}
        finishEditTodo={finishEditTodo}
      />
      <TaskList
        doneTaskList={false}
        todos={notDoneTodos}
        handleDoneTodo={handleDoneTodos}
        startEditTodo={startEditTodo}
        removeTodo={removeTodo}
      ></TaskList>
      <TaskList
        doneTaskList
        todos={doneTodos}
        handleDoneTodo={handleDoneTodos}
        startEditTodo={startEditTodo}
        removeTodo={removeTodo}
      ></TaskList>
    </div>
  )
}
