import './NewTask.css'
import { useState } from 'react'

const NewTask = (props) => {
    const [task, setTask] = useState()
    const { setTasks, tasks } = props

    const handleSubmition = (e) => {
        e.preventDefault()
        
        setTasks([...tasks, task])
    }

    return (
        <div className="newTask">
            <form onSubmit={(e) => handleSubmition(e)}>
                <input type="text" 
                        placeholder="Įveskite užduotį" 
                        onChange={(e) => setTask(e.target.value)} 
                />
                <button className="btn">Pridėti</button>
            </form>
        </div>
    )
}

export default NewTask