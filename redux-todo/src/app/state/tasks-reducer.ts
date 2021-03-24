import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Task } from "../task";
import * as tasksActions from "./tasks-actions";



export interface State {
    tasks: ReadonlyArray<Task>;
    tasksIdProvider: number;
    creatingTask: boolean;
    updatingTask: boolean;
    removingTask: boolean;
}

export const initialState: State = {
    tasks: [],
    tasksIdProvider: 1,
    creatingTask: false,
    updatingTask: false,
    removingTask: false
};

export const reducer = createReducer(initialState,
    on(tasksActions.createTask, (currentState: State, task: Task) =>({...currentState, creatingTask: true})),
    on(tasksActions.createTaskSuccess, (currentState: State, task: Task) => {
        const taskToAdd = new Task(task.text, task.important, currentState.tasksIdProvider);

        return { ...currentState, tasks: [...currentState.tasks, taskToAdd], tasksIdProvider: currentState.tasksIdProvider + 1,
        creatingTask: false };
    }),
    on(tasksActions.createTaskFailure, (currentState: State) => ({...currentState, creatingTask: false})),
    on(tasksActions.removeTask, (currentState: State) => ({...currentState, removingTask: true})),
    on(tasksActions.removeTaskSuccess, (currentState: State, { taskId }) => {
        const filteredTasks = currentState.tasks.filter((task: Task) => task.Id !== taskId);
        if (filteredTasks.length === currentState.tasks.length) {
            console.error(`Could not find task with id ${taskId} in the state.`);
            return currentState;
        }
        return { ...currentState, tasks: filteredTasks, removingTask: false };
    }),
    on(tasksActions.removeTaskFailure, (currentState: State) => ({...currentState, removingTask: false})),
    on(tasksActions.completeTask, (currentState: State) => ({...currentState, updatingTask: true})),
    on(tasksActions.completeTaskSuccess, (currentState: State, { taskId }) => {

        let taskFound = false;

        const updatedTasksList = currentState.tasks.map((task: Task) => {
            if (task.Id === taskId) {
                taskFound = true;
                return task.getCompletedTask();
            }
            return task;
        });

        if (!taskFound) {
            console.error(`Could not find task with id ${taskId} in the state, can't complete task.`);
            return {...currentState, updatingTask: false};
        }

        return { ...currentState, tasks: updatedTasksList, updatingTask: false };
    }),
    on(tasksActions.completeTaskFailure, (currentState: State) => ({...currentState, updatingTask: false}))

);

