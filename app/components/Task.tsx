"use client";

import { ITask, modules, formats } from "@/types/tasks";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "./Modal";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";

interface TaskProps {
  task: ITask;
  setTasks: any;
  index: number;
}

/**
 * The `Task` component is a table row that displays task information and allows for editing, deleting,
 * and viewing task details.
 * @param  - - `task`: The task object containing information about the task (e.g., id, title, desc,
 * status).
 * @returns The code is returning a table row (`<tr>`) element with several table data (`<td>`)
 * elements. Each table data element contains different components and elements, such as text, a select
 * dropdown, and icons. The table row represents a task and its details, such as the task title,
 * status, and actions (edit and delete).
 */
const Task: React.FC<TaskProps> = observer(({ task, setTasks, index }) => {
  const {
    rootStore: { tasksDetails },
  } = useStore();

  const [modalOpenToEdit, setModalOpenToEdit] = useState<boolean>(false);
  const [modalOpenToDelete, setModalOpenToDelete] = useState<boolean>(false);
  const [modalOpenToDetail, setModalOpenToDetail] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSelectChanged, setIsSelectChanged] = useState<boolean>(false);
  const [editInputValue, setEditInputValue] = useState<string>(task.title);
  const [editEditorValue, setEditEditorValue] = useState<string>(task.desc);
  const [statusValue, setStatusValue] = useState<string>(task.status);

  /**
   * The function `handleEditFormSubmit` is an asynchronous event handler that updates tasks and closes a
   * modal.
   * @param e - The parameter `e` is the event object that is passed to the event handler function. In
   * this case, it is the form submit event object.
   */
  const handleEditFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setIsSelectChanged(false);
    setModalOpenToEdit(false);
  };

  /**
   * The function `handleEditorChange` updates the value of `editEditorValue` and sets `isFormSubmitted`
   * to false.
   * @param {string} newValue - The `newValue` parameter is a string that represents the updated value of
   * the editor. It is the new value that the user has entered or modified in the editor.
   */
  const handleEditorChange = (newValue: string) => {
    setEditEditorValue(newValue);
    setIsFormSubmitted(false);
  };

  /**
   * The function `handleDeleteTask` deletes a task with the given ID, updates the list of tasks, and
   * closes the delete modal.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a task
   * that needs to be deleted.
   */
  const handleDeleteTask = async (id: string) => {
    await tasksDetails.deleteTask(id);
    await tasksDetails.fetchTasksDetails();
    setTasks(tasksDetails.getTasksDetails);
    setModalOpenToDelete(false);
  };

  /**
   * The function `handleTitleClick` sets the modal open state to true, retrieves a single todo task,
   * sets the selected task and description HTML state.
   */
  const handleTitleClick = async (id: string) => {
    setModalOpenToDetail(true);
    await tasksDetails.getSingleTask(id);
    await tasksDetails.fetchTasksDetails();
    setModalOpenToDelete(false);
  };

  /**
   * The function `handleSelectChange` updates the status value based on the selected option in a
   * dropdown menu and sets flags to indicate if the select has changed and if the form has been
   * submitted.
   * @param e - The parameter `e` is of type `ChangeEvent<HTMLSelectElement>`. It represents the event
   * object that is triggered when the value of the select element is changed.
   */
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

  /**
   * The `editTask` function updates a task's details and fetches the updated task list.
   */
  const editTask = async () => {
    const payload = {
      id: task.id,
      title: editInputValue,
      desc: editEditorValue,
      status: statusValue,
    };
    await tasksDetails.editTask(payload);
    await tasksDetails.fetchTasksDetails();
    setTasks(tasksDetails.getTasksDetails);
  };

  return (
    <tr key={task.id}>
      <td className="text-center" onClick={() => handleTitleClick(task.id)}>
        {index + 1}
      </td>
      <td className="text-center" onClick={() => handleTitleClick(task.id)}>
        {task.title}
      </td>
      <td className="text-center">
        <select
          className="select select-ghost w-full max-w-xs"
          value={statusValue}
          onChange={handleSelectChange}
        >
          <option className="" value="To Do">To Do</option>
          <option className="" value="In Progress">In Progress</option>
          <option className="" value="Completed">Completed</option>
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
            {/* {selectedTask?.title} */}
            {tasksDetails.getTaskDetail?.title}
          </h3>
          <div
            className="modal-action justify-center"
            dangerouslySetInnerHTML={{
              __html: tasksDetails.getTaskDetail?.desc,
            }}
          ></div>
        </Modal>
      </td>
    </tr>
  );
});

export default Task;
