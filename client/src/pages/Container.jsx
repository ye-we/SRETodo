import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Collections from "../pages/Collections";
import Tasks from "../pages/Tasks";
import TodoContext, { TodoContextProvider } from "../../context/todo-context";
import { Modal } from "antd";
import TaskModal from "../components/TaskModal";

function Container() {
  const [count, setCount] = useState(0);
  const { modalState } = useContext(TodoContext);
  return (
    <div className="bg-darker min-h-[100vh]">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Collections />} />
          <Route exact path="/:id" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
      {modalState === 2 && <TaskModal />}
    </div>
  );
}

export default Container;
