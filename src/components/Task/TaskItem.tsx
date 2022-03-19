import { useAppDispatch } from "app/hooks";
import { VFC, memo } from "react";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Task } from "types";
import { useMutateTask } from "hooks/useMutateTask";
import { setEditedTask } from "slices/taskSlice";

type Props = {
  task: Task;
};

const TaskItem: VFC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  const { deleteTaskMutation } = useMutateTask();
  console.log("TaskItem");

  if (deleteTaskMutation.isLoading) {
    return <div>Deleting...</div>;
  }

  return (
    <li className="my-3">
      <span className="font-bold">{task.title}</span>
      <span> : {task.tag_name}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          onClick={() =>
            dispatch(
              setEditedTask({
                id: task.id,
                title: task.title,
                tag: task.tag,
              })
            )
          }
          className="mx-1 w-5 h-5 text-blue-500 cursor-pointer"
        />
        <TrashIcon
          onClick={() => deleteTaskMutation.mutate(task.id)}
          className="mx-1 w-5 h-5 text-blue-500 cursor-pointer"
        />
      </div>
    </li>
  );
};

export const TaskItemMemo = memo(TaskItem);
