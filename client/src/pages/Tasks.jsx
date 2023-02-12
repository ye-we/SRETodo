import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  EllipsisHorizontalCircleIcon,
  PlusCircleIcon,
  PlusIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import TodoContext from "../../context/todo-context";
import TaskModal from "../components/TaskModal";
import useLongPress from "../utils/useLongPress";
const Tasks = () => {
  const collectionId = useParams().id;
  const { collections, modalState, setModalState, tasksState } =
    useContext(TodoContext);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const currentCollection = collections.find(
    (collection) => collection.id == collectionId
  );

  const onLongPress = (e) => {
    console.log("longpress is triggered");
    setModalState(4);
  };

  const onClick = () => {
    console.log("click triggered");
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  useEffect(() => {
    console.log("here");
    const fetchTodos = async () => {
      try {
        const res = await fetch(`/api/getTodosFromCollection/${collectionId}`, {
          method: "GET",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setIncompleteTasks(data.filter((d) => d.completed === 0));
        setCompletedTasks(data.filter((d) => d.completed === 1));
      } catch (err) {
        console.log("error fetching todos", err);
      }
    };
    fetchTodos();
  }, [tasksState]);
  return (
    <div className="flex flex-col sm:mt-5 p-2 md:w-[50%] w-[90%] mx-auto">
      <div className="flex justify-between mb-3">
        <div className="flex">
          <Link to="/" className="self-center sm:p-3 p-2 rounded-lg bg-dark">
            <ChevronLeftIcon width="20px" height="20px" color="white" />
          </Link>
          <h1 className="sm:text-2xl text-xl font-bold text-white self-center ml-2">
            {currentCollection?.name}
          </h1>
        </div>
        <h1 className="text-white text-2xl font-bold self-center mr-5">...</h1>
      </div>
      <div className="bg-dark sm:py-4 py-2 rounded-lg my-2">
        <a href="#" className="flex" onClick={() => setModalState(2)}>
          <div className="flex items-center sm:mx-3">
            <a
              href="#"
              onClick={() => {
                setModalState(2);
              }}
            >
              <PlusIcon
                width={"25px"}
                height={"25px"}
                color="white"
                className="self-center bg-gradient-to-r from-pink to-purple-500 rounded-md"
              />
            </a>
          </div>
          <h1 className="sm:text-2xl text-xl  text-white self-center ml-2 ">
            Add a task
          </h1>
        </a>
      </div>
      <h1 className="sm:text-2xl text-xl mt-2 text-white text-left ml-2">
        Tasks - {incompleteTasks.length}
      </h1>
      {incompleteTasks.map((task) => (
        <div
          className="bg-dark sm:py-4 p-2 rounded-lg my-2"
          onDoubleClick={(e) => {
            setSelectedTask(task);
            setModalState(3);
          }}
          onMouseDownCapture={() => {
            console.log("here");
            setSelectedTask(task);
          }}
          {...longPressEvent}
        >
          <div className="flex">
            <div>
              <EllipsisHorizontalCircleIcon
                width="20px"
                height="20px"
                color="pink"
                className="self-center sm:mt-1 mr-2"
              />
            </div>
            <div>
              <p className="sm:text-lg text-md text-white">{task.title}</p>
              <p className="sm:text-md text-xs text-gray-300">
                <CalendarDaysIcon
                  width="20px"
                  height="20px"
                  className="inline-block mr-2"
                />
                {task.entryDate.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      ))}
      <h1 className="sm:text-2xl text-xl mt-2 text-white text-left ml-2">
        Completed - {completedTasks.length}
      </h1>
      {completedTasks.map((task) => (
        <div className="bg-dark sm:py-4 p-2 rounded-lg my-2">
          <div className="flex">
            <div>
              <EllipsisHorizontalCircleIcon
                width="20px"
                height="20px"
                color="pink"
                className="self-center sm:mt-1 mr-2"
              />
            </div>
            <div>
              <p className="sm:text-lg text-md text-white line-through">
                {task.title}
              </p>
              <p className="sm:text-md text-xs text-gray-300">
                <CalendarDaysIcon
                  width="20px"
                  height="20px"
                  className="inline-block mr-2"
                />
                {task.entryDate.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      ))}
      {modalState === 3 && <TaskModal task={selectedTask} />}
      {modalState === 4 && <TaskModal task={selectedTask} />}
    </div>
  );
};

export default Tasks;
