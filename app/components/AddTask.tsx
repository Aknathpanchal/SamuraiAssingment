"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import { modules, formats } from "@/types/tasks";
import { ITask } from "@/types/tasks";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";

interface AddTaskProps {
  tasks: ITask[];
  setTasks: any;
}

const AddTask: React.FC<AddTaskProps> = observer(({ tasks, setTasks }) => {
  const {
    rootStore: { tasksDetails },
  } = useStore();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [editorValue, setEditorValue] = useState<string>("");

  /**
   * The handleFormSubmit function is used to handle form submission in a TypeScript React application,
   * where it adds a new task with a unique ID, title, description, and status, fetches the updated task
   * details, updates the state with the new task, clears the input and editor values, and closes the
   * modal.
   * @param e - The parameter "e" is the event object that is passed to the event handler function. In
   * this case, it is the form submit event object.
   */
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const payload = {
      id: uuidv4(),
      title: inputValue,
      desc: editorValue,
      status: "To Do",
    };
    await tasksDetails.addTask(payload);
    await tasksDetails.fetchTasksDetails();
    setTasks(tasksDetails.getTasksDetails);
    setInputValue("");
    setEditorValue("");
    setModalOpen(false);
  };

  /**
   * The function `handleEditorChange` updates the value of `editorValue` with the new value passed as an
   * argument.
   * @param {string} newValue - newValue is a string parameter that represents the new value of the
   * editor.
   */
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
});

export default AddTask;
