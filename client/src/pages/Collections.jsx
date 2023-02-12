import React from "react";
import CollectionCard from "../components/CollectionCard";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import TodoContext from "../../context/todo-context";
import { useEffect } from "react";
import { useState } from "react";

const onChange = (key) => {
  console.log(key);
};

const Collections = () => {
  let { collections, setCollections } = useContext(TodoContext);
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
        <div className="flex flex-wrap">
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
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col sm:mt-5 md:w-[60%] w-[90%] mx-auto">
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
    </div>
  );
};

export default Collections;
