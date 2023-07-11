"use client";


import { useEffect, useState } from "react";
import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { ITask } from "@/types/tasks";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tasksData: ITask[] = await getAllTodos();
      setTasks(tasksData);
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Task Management Application</h1>
        <AddTask tasks={tasks} setTasks={setTasks} />
      </div>
      <TodoList tasks={tasks} setTasks={setTasks} />
    </main>
  );
}


