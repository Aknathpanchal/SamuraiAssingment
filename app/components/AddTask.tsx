"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addTodo, getAllTodos } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { modules, formats } from "@/types/tasks";
import { ITask } from "@/types/tasks";

interface AddTaskProps {
  tasks: ITask[];
  setTasks: any
}

const AddTask: React.FC<AddTaskProps> = ({tasks, setTasks}) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [editorValue, setEditorValue] = useState<string>("");

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const payload={
      id: uuidv4(),
      title: inputValue,
      desc: editorValue,
      status: "To Do",
    }
    await addTodo(payload);
    setInputValue("");
    setEditorValue("");
    const updatedTasks = await getAllTodos();
    setTasks(updatedTasks);
    setModalOpen(false);
  };

  const handleEditorChange = (newValue: string) => {
    setEditorValue(newValue);
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Task
        <AiOutlinePlus size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleFormSubmit}>
          <h3 className="font-bold text-lg">Add New Task</h3>
          <br />
          <input
            required
            className="input input-bordered w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Enter title here..."
          />
          <br />
          <br />
          <ReactQuill
            className="w-full"
            theme="snow"
            modules={modules}
            formats={formats}
            value={editorValue}
            onChange={handleEditorChange}
            placeholder="Enter description here..."
          />
          <br />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
