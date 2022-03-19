import { useAppDispatch } from "app/hooks";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Tag } from "types";
import { resetEditedTag } from "slices/taskSlice";

const postTag = async (tag: Omit<Tag, "id">) =>
  axios.post<Tag>(`${process.env.REACT_APP_API_URL}/tags/`, tag);

const patchTag = async (tag: Tag) =>
  axios.patch<Tag>(`${process.env.REACT_APP_API_URL}/tags/${tag.id}/`, tag);

const deleteTag = async (id: number) =>
  axios.delete(`${process.env.REACT_APP_API_URL}/tags/${id}/`);

export const useMutateTag = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const createTagMutation = useMutation(postTag, {
    onSuccess: (res) => {
      const prevTags = queryClient.getQueryData<Tag[]>("tags");
      if (prevTags) {
        queryClient.setQueryData<Tag[]>("tags", [...prevTags, res.data]);
      }
      dispatch(resetEditedTag());
    },
  });

  const updateTagMutation = useMutation(patchTag, {
    onSuccess: (res) => {
      const prevTags = queryClient.getQueryData<Tag[]>("tags");
      if (prevTags) {
        queryClient.setQueryData<Tag[]>(
          "tags",
          prevTags.map((tag) => (tag.id === res.data.id ? res.data : tag))
        );
      }
      dispatch(resetEditedTag());
    },
  });

  const deleteTagMutation = useMutation(deleteTag, {
    onSuccess: (res) => {
      const prevTags = queryClient.getQueryData<Tag[]>("tags");
      if (prevTags) {
        queryClient.setQueryData<Tag[]>(
          "tags",
          prevTags.filter((tag) => tag.id !== res.data.id)
        );
      }
      dispatch(resetEditedTag());
    },
  });

  return { createTagMutation, updateTagMutation, deleteTagMutation };
};
