import './TaskList.css'
import Task from '../Task/Task'

const TaskList = (props) => {
    const { tasks, setTasks } = props

    return tasks.length > 0 && (
        <div className="taskList">
            <ul>
                {tasks.map((value, index) => <Task key={value + index} index={index} title={value} setTasks={setTasks} tasks={tasks} />)}
            </ul>
        </div>
    )
}

export default TaskList