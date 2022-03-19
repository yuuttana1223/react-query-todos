import { useAppDispatch, useAppSelector } from "app/hooks";
import { useAllTags } from "hooks/useAllTags";
import { useMutateTask } from "hooks/useMutateTask";
import { ChangeEvent, FormEvent, useCallback, VFC, memo } from "react";
import { selectEditedTask, setEditedTask } from "slices/taskSlice";

const TaskEdit: VFC = () => {
  const dispatch = useAppDispatch();
  const editedTask = useAppSelector(selectEditedTask);
  const { data: tags, isLoading, isError } = useAllTags();
  const { createTaskMutation, updateTaskMutation } = useMutateTask();
  console.log("TaskEdit");

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (editedTask.id === 0) {
        createTaskMutation.mutate(editedTask);
      } else {
        updateTaskMutation.mutate(editedTask);
      }
    },
    [createTaskMutation, editedTask, updateTaskMutation]
  );

  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(
        setEditedTask({
          ...editedTask,
          tag: Number(e.target.value),
        })
      );
    },
    [dispatch, editedTask]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (createTaskMutation.isLoading) {
    return <div>Creating...</div>;
  }

  if (updateTaskMutation.isLoading) {
    return <div>Updating...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          className="py-2 px-3 mb-3 border border-gray-300"
        />
        <button
          disabled={!editedTask.title || !editedTask.tag}
          className="py-2 px-3 m-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded disabled:opacity-40"
        >
          {editedTask.id === 0 ? "Create" : "Update"}
        </button>
      </form>
      <select
        value={editedTask.tag}
        onChange={handleSelectChange}
        className="py-2 px-3 mb-3 border border-gray-300"
      >
        <option value={0}>Tag</option>
        {tags?.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const TaskEditMemo = memo(TaskEdit);
