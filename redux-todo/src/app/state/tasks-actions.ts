import { createAction, props } from "@ngrx/store";
import { Task } from "../task";

export const createTask = createAction('[Tasks] create new task', props<Task>());

export const completeTask = createAction('[Tasks] mark task as completed', props<{taskId: number}>());

export const removeTask = createAction('[Tasks] remove task', props<{taskId: number}>());
