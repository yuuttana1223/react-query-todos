import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { EditTask, Tag } from "types";

export type TaskState = {
  editedTask: EditTask;
  editedTag: Tag;
};

const initialState: TaskState = {
  editedTask: {
    id: 0,
    title: "",
    tag: 0,
  },
  editedTag: {
    id: 0,
    name: "",
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      state.editedTask = action.payload;
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask;
    },
    setEditedTag: (state, action: PayloadAction<Tag>) => {
      state.editedTag = action.payload;
    },
    resetEditedTag: (state) => {
      state.editedTag = initialState.editedTag;
    },
  },
});

export const { setEditedTask, resetEditedTag, setEditedTag, resetEditedTask } =
  taskSlice.actions;

export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectEditedTag = (state: RootState) => state.task.editedTag;

export const taskReducer = taskSlice.reducer;
