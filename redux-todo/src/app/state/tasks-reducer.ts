import { createReducer, on } from "@ngrx/store";
import { Task } from "../task";
import * as tasksActions from "./tasks-actions";



export interface State {
    tasks: ReadonlyArray<Task>;
    tasksIdProvider: number;
}

export const initialState: State = {
    tasks: [],
    tasksIdProvider: 1
};

export const reducer = createReducer(initialState,
    on(tasksActions.createTaskSuccess, (state: State, task: Task) => {
        const taskToAdd = new Task(task.text, task.important, state.tasksIdProvider);

        return { ...state, tasks: [...state.tasks, taskToAdd], tasksIdProvider: state.tasksIdProvider + 1 };
    }),
    on(tasksActions.removeTaskSuccess, (state: State, { taskId }) => {
        const filteredTasks = state.tasks.filter((task: Task) => task.Id !== taskId);
        if (filteredTasks.length === state.tasks.length) {
            console.error(`Could not find task with id ${taskId} in the state.`);
            return state;
        }
        return { ...state, tasks: filteredTasks };
    }),
    on(tasksActions.completeTaskSuccess, (state: State, { taskId }) => {

        let taskFound = false;

        const updatedTasksList = state.tasks.map((task: Task) => {
            if (task.Id === taskId) {
                taskFound = true;
                return task.getCompletedTask();
            }
            return task;
        });

        if (!taskFound) {
            console.error(`Could not find task with id ${taskId} in the state, can't complete task.`);
            return state;
        }

        return { ...state, tasks: updatedTasksList };
    }),

);

