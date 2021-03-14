import { createSelector } from "@ngrx/store";
import { AppState } from "./reducer";
import { State } from "./tasks-reducer";

export const selectTasks = createSelector((state: AppState) => state.tasksManagement,
    (tasksManagement: State) => tasksManagement.tasks);
