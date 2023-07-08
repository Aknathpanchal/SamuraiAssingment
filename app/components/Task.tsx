import { ITask } from "@/types/tasks"

interface TaskProps {
    task: ITask
}

const Task:React.FC<TaskProps> =({task}) => {
  return (
    <tr key={task.id}>
        <th>{task.id}</th>
        <td>{task.title}</td>
        <td>{task.desc}</td>
        <td>{task.status}</td>
      </tr>  
  )
}

export default Task
