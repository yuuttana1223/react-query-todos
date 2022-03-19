import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "app/hooks";
import { useMutateTag } from "hooks/useMutateTag";
import { VFC, useCallback, memo } from "react";
import { setEditedTag } from "slices/taskSlice";
import { Tag } from "types";

type Props = {
  tag: Tag;
};

const TagItem: VFC<Props> = ({ tag }) => {
  const dispatch = useAppDispatch();
  const { deleteTagMutation } = useMutateTag();

  const handleEdit = useCallback(() => {
    dispatch(setEditedTag(tag));
  }, [dispatch, tag]);

  const handleDelete = useCallback(() => {
    deleteTagMutation.mutate(tag.id);
  }, [deleteTagMutation, tag.id]);

  console.log("TagItem");

  if (deleteTagMutation.isLoading) {
    return <p>Deleting...</p>;
  }

  return (
    <li className="my-3">
      <span className="font-bold">{tag.name}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          onClick={handleEdit}
          className="mx-1 w-5 h-5 text-blue-500 cursor-pointer"
        />
        <TrashIcon
          onClick={handleDelete}
          className="w-5 h-5 text-blue-500 cursor-pointer"
        />
      </div>
    </li>
  );
};

export const TagItemMemo = memo(TagItem);
