import './App.css'
import NewTask from './components/NewTask/NewTask'
import TaskList from './components/TaskList/TaskList'
import { useState } from 'react'

const App = () => {
  const [tasks, setTasks] = useState([])

  return (
    <>
      <div className="wrapper">
        <h1>Užduočių tvarkyklė</h1>
        <NewTask setTasks={setTasks} tasks={tasks} />
        <TaskList setTasks={setTasks} tasks={tasks} />
      </div>
    </>
  )
}

export default App
