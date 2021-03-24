import { createSelector } from "@ngrx/store";
import { AppState } from "./reducer";
import { State } from "./tasks-reducer";

export const selectTasks = createSelector((state: AppState) => state.tasksManagement,
    (tasksManagement: State) => tasksManagement.tasks);


const selectCreatingTask = (state: AppState) => state.tasksManagement.creatingTask;
const selectRemovingTask = (state: AppState) => state.tasksManagement.removingTask;
const selectUpdatingTask = (state: AppState) => state.tasksManagement.updatingTask;

export const pendingOperation = createSelector(selectCreatingTask, selectRemovingTask, selectUpdatingTask,
    (creatingTask: boolean, removingTask: boolean, updatingTask: boolean) => creatingTask || removingTask || updatingTask);
