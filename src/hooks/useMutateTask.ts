import { useAppDispatch } from "app/hooks";
import { useMutation, useQueryClient } from "react-query";
import { EditTask, Task } from "types";
import axios from "axios";
import { resetEditedTask } from "slices/taskSlice";

const postTask = async (task: Omit<EditTask, "id">) =>
  axios.post<Task>(`${process.env.REACT_APP_API_URL}/tasks/`, task);

const patchTask = async (task: EditTask) =>
  axios.patch<Task>(`${process.env.REACT_APP_API_URL}/tasks/${task.id}/`, task);

const deleteTask = async (id: number) =>
  axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}/`);

export const useMutateTask = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation(postTask, {
    onSuccess: (res) => {
      const prevTasks = queryClient.getQueryData<Task[]>("tasks");
      if (prevTasks) {
        queryClient.setQueryData<Task[]>("tasks", [...prevTasks, res.data]);
      }
      dispatch(resetEditedTask());
    },
  });

  const updateTaskMutation = useMutation(patchTask, {
    onSuccess: (res) => {
      const prevTasks = queryClient.getQueryData<Task[]>("tasks");
      if (prevTasks) {
        queryClient.setQueryData<Task[]>(
          "tasks",
          prevTasks.map((task) => (task.id === res.data.id ? res.data : task))
        );
      }
      dispatch(resetEditedTask());
    },
  });

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: (_res, taskId) => {
      const prevTasks = queryClient.getQueryData<Task[]>("tasks");
      if (prevTasks) {
        queryClient.setQueryData<Task[]>(
          "tasks",
          prevTasks.filter((task) => task.id !== taskId)
        );
      }
      dispatch(resetEditedTask());
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
