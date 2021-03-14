import { Action, ActionReducerMap } from "@ngrx/store";

import * as fromTasks  from "./tasks-reducer";

export interface AppState {
    tasksManagement: fromTasks.State;
}

export const initialState: AppState = {
    tasksManagement: fromTasks.initialState
}

export const appReducer: ActionReducerMap<AppState, Action> = {
    tasksManagement: fromTasks.reducer
}