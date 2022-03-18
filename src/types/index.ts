export type Task = {
  id: number;
  title: string;
  tag: number;
  created_at: string;
  updated_at: string;
};

export type EditTask = Pick<Task, "id" | "title" | "tag">;

export type Tag = {
  id: number;
  name: string;
};
