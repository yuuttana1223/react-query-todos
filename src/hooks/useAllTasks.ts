import axios from "axios";
import { useQuery } from "react-query";
import { Task } from "types";

const fetchAllTasks = async () => {
  const res = await axios.get<Task[]>(`${process.env.LOCAL_API_URL}/tasks/`);
  return res.data;
};

export const useAllTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: "tasks",
    queryFn: fetchAllTasks,
    staleTime: 0,
  });
};
