import { createAction, props } from "@ngrx/store";
import { Task } from "../task";

export const createTask = createAction('[Tasks] create new task', props<Task>());
export const createTaskSuccess = createAction('[Tasks] create task - success', props<Task>());
export const createTaskFailure = createAction('[Tasks] create task - failure');

export const completeTask = createAction('[Tasks] mark task as completed', props<{Task: Task}>());
export const completeTaskSuccess = createAction('[Tasks] mark task as completed - success', props<{taskId: number}>());
export const completeTaskFailure = createAction('[Tasks] mark task as completed - failed', props<{taskId: number}>());

export const removeTask = createAction('[Tasks] remove task', props<{taskId: number}>());
export const removeTaskSuccess = createAction('[Tasks] remove task - success', props<{taskId: number}>());
export const removeTaskFailure = createAction('[Tasks] remove task - failure', props<{taskId: number}>());
