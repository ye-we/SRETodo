import React from "react";
import { DatePicker } from "antd";
import {
  BellIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  Square2StackIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import TodoContext from "../../context/todo-context";

const Navbar = () => {
  const { modalState, setModalState } = useContext(TodoContext);
  return (
    <nav className="bg-dark sm:p-4 p-2 flex justify-between sm:relative fixed bottom-0 left-0 m-0 z-10 w-[100%]">
      <div className=" hidden sm:flex">
        <div className="flex sm:mx-3">
          <SquaresPlusIcon
            className="mr-1 self-center text-gray-300"
            width="20px"
            height="20px"
          />
          <h1 className="text-lg text-gray-300 self-center">Dashboard</h1>
        </div>
        <div className="flex sm:mx-3">
          <Square2StackIcon
            className="mr-1 self-center"
            width="20px"
            height="20px"
            color="white"
          />
          <h1 className="text-lg text-white self-center">Collections</h1>
        </div>
      </div>
      <ul className="flex sm:mx-3 items-center justify-center mx-auto">
        <li className="sm:hidden">
          <a
            href="#"
            className="sm:mx-3 block p-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <SquaresPlusIcon
              className="mr-1 self-center text-gray-300"
              width="20px"
              height="20px"
            />{" "}
          </a>
        </li>
        <li className="sm:hidden">
          <a
            href="#"
            className="sm:mx-3 block p-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <Square2StackIcon
              className="mr-1 self-center"
              width="20px"
              height="20px"
              color="white"
            />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="sm:mx-3 block p-4 text-gray-700 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            onClick={() => {
              setModalState(2);
            }}
          >
            <PlusIcon
              width={"25px"}
              height={"25px"}
              color="white"
              className="bg-gradient-to-r from-pink to-purple-500 rounded-md"
            />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="sm:mx-3 block p-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <MagnifyingGlassIcon width={"20px"} height={"20px"} color="white" />
          </a>
        </li>
        <li>
          <a
            href="#"
            className="sm:mx-3 block p-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <BellIcon width={"20px"} height={"20px"} color="white" />
          </a>
        </li>
        <li className="md:block hidden">
          <a
            href="#"
            className="sm:mx-3  block p-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <img
              className="w-[20px] h-[20px] rounded-full"
              src="https://via.placeholder.com/150"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
