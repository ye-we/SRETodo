import React, { createContext, useState } from "react";

const TodoContext = createContext({
  collections: [],
  setCollections: () => {},
  modalState: false,
  setModalState: () => {},
  tasksState: false,
  setTasksState: () => {},
});

export const TodoContextProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [modalState, setModalState] = useState(1);
  const [tasksState, setTasksState] = useState(false);
  return (
    <TodoContext.Provider
      value={{
        collections,
        setCollections,
        modalState,
        setModalState,
        tasksState,
        setTasksState,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
