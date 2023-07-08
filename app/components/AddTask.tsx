'use client'

import {AiOutlinePlus} from "react-icons/ai"
import Modal from "./Modal"
import { useState } from "react"

function AddTask() {
const [modalOpen,setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Add New Task
      <AiOutlinePlus size={18}/>
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        Modal for add Todos
      </Modal>
    </div>
  )
}

export default AddTask
