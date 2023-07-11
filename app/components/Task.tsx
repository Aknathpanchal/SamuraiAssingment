"use client";

import { ITask, modules, formats } from "@/types/tasks";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "./Modal";
import { deleteTodo, editTodo, getAllTodos, getSingleTodo } from "@/api";

interface TaskProps {
  task: ITask;
  setTasks: any;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, setTasks, index }) => {

  const [modalOpenToEdit, setModalOpenToEdit] = useState<boolean>(false);
  const [modalOpenToDelete, setModalOpenToDelete] = useState<boolean>(false);
  const [modalOpenToDetail, setModalOpenToDetail] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSelectChanged, setIsSelectChanged] = useState<boolean>(false);
  const [editInputValue, setEditInputValue] = useState<string>(task.title);
  const [editEditorValue, setEditEditorValue] = useState<string>(task.desc);
  const [statusValue, setStatusValue] = useState<string>(task.status);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [descHtml, setDescHtml] = useState<string>("");

  console.log(selectedTask)

  const handleEditFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setIsSelectChanged(false);
    setModalOpenToEdit(false);
    const updatedTasks = await getAllTodos();
    setTasks(updatedTasks);
  };

  const handleEditorChange = (newValue: string) => {
    setEditEditorValue(newValue);
    setIsFormSubmitted(false);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    const updatedTasks = await getAllTodos();
    setTasks(updatedTasks);
    setModalOpenToDelete(false);
  };

  const handleTitleClick = async () => {
    setModalOpenToDetail(true)
    const taskData = await getSingleTodo(task.id);
    setSelectedTask(taskData);
    setDescHtml(taskData.desc);
  };

  const handleSelectChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    if (newStatus !== statusValue) {
      setStatusValue(newStatus);
      setIsSelectChanged(true);
      setIsFormSubmitted(false);
    }
  };

  useEffect(() => {
    if (isFormSubmitted) {
      editTask();
    } else if (isSelectChanged) {
      editTask();
    }
  }, [isFormSubmitted, isSelectChanged]);

  const editTask = async () => {
    await editTodo({
      id: task.id,
      title: editInputValue,
      desc: editEditorValue,
      status: statusValue,
    });
    const updatedTasks = await getAllTodos();
    setTasks(updatedTasks);
  };

  return (
    <tr key={task.id}>
      <td className="text-center" onClick={handleTitleClick}>{index + 1}</td>
      <td className="text-center" onClick={handleTitleClick}>{task.title}</td>
      <td className="text-center">
        <select
          className="select select-ghost w-full max-w-xs"
          value={statusValue}
          onChange={handleSelectChange}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </td>
      <td className="flex gap-5 text-center items-center justify-center ">
        <FiEdit
          cursor="pointer"
          className="text-blue-500"
          size={45}
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
              Update
            </button>
          </form>
        </Modal>

        <FiTrash
          cursor="pointer"
          className="text-red-500"
          size={45}
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

        <Modal
          modalOpen={modalOpenToDetail}
          setModalOpen={setModalOpenToDetail}
        >
          <h3 className="text-lg">
            {selectedTask?.title}
          </h3>
          <div className="modal-action justify-center" dangerouslySetInnerHTML={{ __html: descHtml }}>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
