import React from "react";
import CollectionCard from "../components/CollectionCard";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import TodoContext from "../../context/todo-context";
import { useEffect } from "react";
import { useState } from "react";
import {
  BookOpenIcon,
  CircleStackIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import TaskModal from "../components/TaskModal";

const onChange = (key) => {
  console.log(key);
};

const Collections = () => {
  let { collections, setCollections, modalState, setModalState } =
    useContext(TodoContext);
  useEffect(() => {
    const fetchCurrentCollection = async () => {
      try {
        const res = await fetch(`/api/getAllCollections`, {
          method: "GET",
          // mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        setCollections(data);
      } catch (err) {
        console.log("fetching collections error: ", err);
      }
    };

    fetchCurrentCollection();
  }, []);
  const items = [
    {
      key: "1",
      label: `Favourites`,
      children: <div className="text-white">Empty</div>,
    },
    {
      key: "2",
      label: `All Collections`,
      children: (
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
          {collections?.length > 0 &&
            collections.map((collection) => (
              <Link
                key={collection.id}
                to={`${collection.id}`}
                className="mr-auto"
              >
                <CollectionCard data={collection} />
              </Link>
            ))}
          <a
            href="#"
            onClick={() => {
              setModalState(5);
            }}
            className="md:p-3 rounded-xl mt-3 justify-center items-center p-2 flex flex-col md:w-[250px] md:h-[200px] w-[150px] h-[150px] bg-dark"
          >
            <PlusIcon width="50px" height="50px" />
          </a>
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col sm:mt-5 pb-3 md:w-[60%] w-[90%] mx-auto">
      <div className="flex justify-between">
        <h1 className="text-white font-bold sm:text-2xl text:xl sm:my-5 my-3">
          Collections
        </h1>
        <h1 className="text-white sm:text-2xl text:xl font-bold self-center mr-5">
          ...
        </h1>
      </div>
      <Tabs
        style={{
          color: "white",
        }}
        defaultActiveKey="2"
        items={items}
        onChange={onChange}
      />
      {modalState === 5 && <TaskModal />}
    </div>
  );
};

export default Collections;
