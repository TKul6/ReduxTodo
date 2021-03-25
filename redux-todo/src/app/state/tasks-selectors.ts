import { createSelector } from '@ngrx/store';
import { Task } from '../task';
import { AppState } from './reducer';
import { State } from './tasks-reducer';


const tasksManagementFeature = (state: AppState) => state.tasksManagement;

export const selectTasks = createSelector(tasksManagementFeature, (tasksManagement: State) => tasksManagement.tasks);


const creatingTask = (state: AppState) => state.tasksManagement.creatingTask;
const removingTask = (state: AppState) => state.tasksManagement.removingTask;
const updatingTask = (state: AppState) => state.tasksManagement.updatingTask;

export const selectPendingOperation = createSelector(creatingTask, removingTask, updatingTask,
    (isCreatingTask: boolean, isRemovingTask: boolean, isUpdatingTask: boolean) => isCreatingTask || isRemovingTask || isUpdatingTask);


const projectTasks = (state: AppState) => state.tasksManagement.tasks;
export const selectTaskCreated = createSelector(creatingTask, projectTasks,
    (createTask: boolean, tasks: ReadonlyArray<Task>) => ({creatingTask: createTask, tasksCount: tasks.length}));