export type Task = {
  id: number;
  title: string;
  tag: number;
  tag_name: string;
  created_at: string;
  updated_at: string;
};

export type EditTask = Pick<Task, "id" | "title" | "tag">;

export type Tag = {
  id: number;
  name: string;
};
