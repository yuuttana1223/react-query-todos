import { VFC, memo } from "react";
import { useAllTasks } from "hooks/useAllTasks";
import { TaskItemMemo } from "components/Task/TaskItem";

const TaskList: VFC = () => {
  const { data: tasks, isLoading, isError } = useAllTasks();
  console.log("TaskList");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <ul>
      {tasks?.map((task) => (
        <TaskItemMemo key={task.id} task={task} />
      ))}
    </ul>
  );
};

export const TaskListMemo = memo(TaskList);
