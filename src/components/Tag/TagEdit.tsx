import { useAppDispatch, useAppSelector } from "app/hooks";
import { useMutateTag } from "hooks/useMutateTag";
import { memo, useCallback, VFC, FormEvent } from "react";
import { selectEditedTag, setEditedTag } from "slices/taskSlice";

const TagEdit: VFC = () => {
  const dispatch = useAppDispatch();
  const editedTag = useAppSelector(selectEditedTag);
  const { createTagMutation, updateTagMutation } = useMutateTag();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (editedTag.id === 0) {
        createTagMutation.mutate(editedTag);
      } else {
        updateTagMutation.mutate(editedTag);
      }
    },
    [createTagMutation, editedTag, updateTagMutation]
  );

  console.log("TagEdit");

  if (createTagMutation.isLoading) {
    return <div>Creating...</div>;
  }

  if (updateTagMutation.isLoading) {
    return <div>Updating...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={editedTag.name}
        onChange={(e) =>
          dispatch(setEditedTag({ ...editedTag, name: e.target.value }))
        }
        placeholder="new task ?"
        className="py-2 px-3 mb-3 border border-gray-300"
      />
      <button
        className="py-2 px-3 m-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded disabled:opacity-40"
        disabled={!editedTag.name}
      >
        {editedTag.id === 0 ? "Create" : "Update"}
      </button>
    </form>
  );
};

export const TagEditMemo = memo(TagEdit);
