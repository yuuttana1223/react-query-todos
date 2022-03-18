import axios from "axios";
import { useQuery } from "react-query";
import { Tag } from "types";

const fetchAllTags = async () => {
  const res = await axios.get<Tag[]>(`${process.env.LOCAL_API_URL}/tags/`);
  return res.data;
};

export const useAllTasks = () => {
  return useQuery<Tag[], Error>({
    queryKey: "tags",
    queryFn: fetchAllTags,
    staleTime: 60,
  });
};
