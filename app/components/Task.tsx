"use client";

import { ITask, modules, formats } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [modalOpenToEdit, setModalOpenToEdit] = useState<boolean>(false);
  const [modalOpenToDelete, setModalOpenToDelete] = useState<boolean>(false);
  const [editInputValue, setEditInputValue] = useState<string>(task.title);
  const [editEditorValue, setEditEditorValue] = useState<string>(task.desc);

  const handleEditFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      title: editInputValue,
      desc: editEditorValue,
      status: "TODO",
    });
    setModalOpenToEdit(false);
    router.refresh();
  };

  const handleEditorChange = (newValue: string) => {
    setEditEditorValue(newValue);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModalOpenToDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{task.status}</td>
      <td className="flex gap-5">
        <FiEdit
          cursor="pointer"
          className="text-blue-500"
          size={25}
          onClick={() => setModalOpenToEdit(true)}
        />

        <Modal modalOpen={modalOpenToEdit} setModalOpen={setModalOpenToEdit}>
          <form onSubmit={handleEditFormSubmit}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <br />
            <input
              required
              className="input input-bordered w-full"
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
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
              value={editEditorValue}
              onChange={handleEditorChange}
              placeholder="Enter description here..."
            />
            <br />
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </Modal>

        <FiTrash
          cursor="pointer"
          className="text-red-500"
          size={25}
          onClick={() => setModalOpenToDelete(true)}
        />

        <Modal
          modalOpen={modalOpenToDelete}
          setModalOpen={setModalOpenToDelete}
        >
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button className="btn" onClick={() => handleDeleteTask(task.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
