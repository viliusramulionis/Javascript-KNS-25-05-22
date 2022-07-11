import './App.css'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [taskList, setTaskList] = useState([])

  const NewTask = () => {
    const [task, setTask] = useState('')

    const handleNewTask = (event) => {
      event.preventDefault()
      setTaskList([task, ...taskList])
    }

    return (
      <>
        <h1>Nauja užduotis</h1>
        <Form onSubmit={handleNewTask}>
          <InputGroup>
            <FormControl placeholder="Įveskite užduotį" onChange={(e) => setTask(e.target.value)} value={task}></FormControl>
            <Button type="submit">Pridėti</Button>
          </InputGroup>
        </Form>
      </>
    )
  }

  const TaskList = () => {

    const DisplayList = () => { 
      return taskList.map((value, index) => <ListItem key={index} taskName={value} />)
    }

    const ListItem = (props) => {
      return (
        <div>{props.taskName}</div>
      )
    }

    return (
      <>
        <h1>Užduočių sąrašas</h1>
        <DisplayList />
      </>
    )
  }

  return (
    <div className="App">
      <h1>ToDoList</h1>
      <NewTask />
      <TaskList />
    </div>
  )
}

export default App;
