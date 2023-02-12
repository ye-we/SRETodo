import { BookOpenIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useEffect } from "react";

const CollectionCard = ({ data }) => {
  const [finishedCount, setFinishedCount] = useState();
  const [todosCount, setTodosCount] = useState();
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch(`/api/getFinishedCount/${data.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await res.json();
        setTodosCount(response[0][0]["COUNT (*)"]);
        setFinishedCount(response[1][0]["COUNT (id)"]);
      } catch (err) {
        console.log("Adding new todo error", err);
      }
    };
    fetchCounts();
  }, []);
  return (
    <div className="md:p-3 rounded-xl mt-3 justify-around p-2 flex flex-col md:w-[250px] md:h-[200px] w-[150px] h-[150px] bg-dark">
      <div>
        <BookOpenIcon width="30px" height="30px" color="white" />
      </div>
      <h1 className="text-white font-bold">{data.name}</h1>
      <div className="flex justify-between">
        <p className="text-white">
          {finishedCount}/{todosCount} done
        </p>
        <CircleStackIcon width="30px" height="30px" color="pink" />
      </div>
    </div>
  );
};

export default CollectionCard;
