import { ITask } from "@/types/tasks";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr >
            <th className="text-center">Sr.No.</th>
            <th className="text-center">Task</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, taskIndex) => (
            <Task key={task.id} task={task} index={taskIndex} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;

