import { ITask } from "./types/tasks";

const baseUrl ='http://localhost:3002';

export const getAllTodos =async (): Promise<ITask[]> => {
const res = await fetch(`${baseUrl}/tasks`);
const todos= await res.json();
return todos;
}