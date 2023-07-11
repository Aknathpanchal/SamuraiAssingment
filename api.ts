import { toast } from "react-toastify";
import { ITask } from "./types/tasks";

// const baseUrl = process.env.API_URL
const baseUrl = "http://localhost:3002";

export const getAllTodos = async (): Promise<ITask[]> => {
  try{ 
    const res = await fetch(`${baseUrl}/tasks`, { 
    cache: "no-store" 
  });
  const todos = await res.json();
  return todos;
} catch (error) {
  console.error("Error fetching tasks:", error);
  return [];
}
 
};

export const addTodo = async (payload: ITask): Promise<ITask> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to add task. Please try again.");
    }

    const newTask: ITask = await res.json();
    toast.success('Task added Successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return newTask;
  } catch (error) {
    toast.error('Something went wrong!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return payload;
  }
};


export const editTodo = async (todo: ITask): Promise<ITask> => {
  try{
      const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  toast.success('Task Updated successfully!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  return updatedTodo;
  } catch (error) {
    toast.error('Something went wrong!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return todo;
  }

};

export const getSingleTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {});
  const singleTodo = await res.json();
  return singleTodo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await fetch(`${baseUrl}/tasks/${id}`, {
      method: "DELETE",
    });
    toast.success('Task delete successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  } catch (error) {
    toast.error('Something went wrong!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
};

