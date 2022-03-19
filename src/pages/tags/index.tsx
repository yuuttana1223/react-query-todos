import { VFC } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { TagListMemo } from "components/Tag/TagList";
import { TagEditMemo } from "components/Tag/TagEdit";

export const TagsPage: VFC = () => {
  const navigate = useNavigate();

  console.log("TagsPage");

  return (
    <>
      <p className="mb-10 text-xl font-bold">Tags</p>
      <div className="grid grid-cols-2 gap-40">
        <TagListMemo />
        <TagEditMemo />
      </div>
      <ChevronDoubleLeftIcon
        onClick={() => navigate("/")}
        className="mt-2 w-5 h-5 text-blue-500 cursor-pointer"
      />
      <p>Task Page</p>
    </>
  );
};
