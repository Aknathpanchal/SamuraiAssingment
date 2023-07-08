import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export default async function Home() {
  const tasks= await getAllTodos();
  console.log(tasks)
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Task Management Application</h1>
        <AddTask />
      </div>
        <TodoList tasks={tasks}/>
    </main>
  )
}
