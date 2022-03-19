import { useState, VFC } from "react";

import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { TaskEditMemo } from "components/Task/TaskEdit";
import { TaskListMemo } from "components/Task/TaskList";

export const TasksPage: VFC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  console.log("TasksPage");

  return (
    <>
      <div className="text-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="dummy text"
          className="py-2 px-3 mb-3 border border-gray-300"
        />
      </div>
      <p className="mb-10 text-xl font-bold text-center">Tasks</p>
      <div className="grid grid-cols-2 gap-40">
        <TaskListMemo />
        <TaskEditMemo />
      </div>
      <ChevronDoubleRightIcon
        onClick={() => navigate("/tags")}
        className="mt-2 w-5 h-5 text-blue-500 cursor-pointer"
      />
      <p>Tag Page</p>
    </>
  );
};
