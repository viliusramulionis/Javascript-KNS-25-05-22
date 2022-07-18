import { MdDeleteForever } from "react-icons/md";

const Task = (props) => {
    const { index, title, tasks, setTasks } = props

    const updateTasks = () => {
        setTasks(tasks.filter((value, i) => i != index))
    }

    return (
        <li onClick={e => e.target.classList.toggle('done')}>
            {title}
            <MdDeleteForever onClick={updateTasks} />
        </li>
    )
}

export default Task