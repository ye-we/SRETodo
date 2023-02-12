import {
  BookOpenIcon,
  CheckCircleIcon,
  CircleStackIcon,
  EllipsisHorizontalCircleIcon,
  PencilIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useEffect } from "react";

const iconRand = [
  <BookOpenIcon width="30px" height="30px" color="white" />,
  <UserIcon width="30px" height="30px" color="white" />,
  <PencilIcon width="30px" height="30px" color="white" />,
  <ShoppingCartIcon width="30px" height="30px" color="white" />,
];
const colorsRand = [
  "bg-green-300",
  "bg-red-400",
  "bg-purple-600",
  "bg-orange-400",
];

const CollectionCard = ({ data, i }) => {
  const [finishedCount, setFinishedCount] = useState();
  const [todosCount, setTodosCount] = useState();
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch(
          `https://todo-dashobard.onrender.com/api/getFinishedCount/${data.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
      <div
        className={`md:w-[50px] md:h-[50px] w-[40px] h-[40px] flex items-center justify-center ${
          colorsRand[i] || colorsRand[2]
        } rounded-lg`}
      >
        {iconRand[i] || iconRand[1]}
      </div>
      <h1 className="text-white font-bold">{data.name}</h1>
      <div className="flex justify-between">
        <p className="text-white">
          {finishedCount}/{todosCount} done
        </p>
        <EllipsisHorizontalCircleIcon
          width="30px"
          height="30px"
          color="white"
        />
      </div>
    </div>
  );
};

export default CollectionCard;
