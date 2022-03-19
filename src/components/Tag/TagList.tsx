import { useAllTags } from "hooks/useAllTags";
import { memo, VFC } from "react";
import { TagItemMemo } from "components/Tag/TagItem";

const TagList: VFC = () => {
  const { data: tags, isLoading, isError } = useAllTags();

  console.log("TagList");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <ul>
      {tags?.map((tag) => (
        <TagItemMemo key={tag.id} tag={tag} />
      ))}
    </ul>
  );
};

export const TagListMemo = memo(TagList);
