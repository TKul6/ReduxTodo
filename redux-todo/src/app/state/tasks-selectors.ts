import { createSelector } from '@ngrx/store';
import { Task } from '../task';
import { AppState } from './reducer';
import { State } from './tasks-reducer';


const tasksManagementFeature = (state: AppState) => state.tasksManagement;

export const selectTasks = createSelector(tasksManagementFeature, (tasksManagement: State) => tasksManagement.tasks);

export const selectPendingOperation = createSelector(tasksManagementFeature,
    (tasksManagement: State) => tasksManagement.creatingTask ||
tasksManagement.removingTask || tasksManagement.updatingTask);

export const selectTaskCreated = createSelector(tasksManagementFeature, (tasksManagement: State) =>
    ({creatingTask: tasksManagement.creatingTask, tasksCount: tasksManagement.tasks.length}));
