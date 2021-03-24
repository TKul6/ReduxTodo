import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TasksService } from "../services/tasks-service";
import * as tasksActions from "./tasks-actions";
import { catchError, exhaustMap, map, } from "rxjs/operators";
import { Task } from "../task";
import { of } from "rxjs";

@Injectable()
export class TaskEffects {

    createTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.createTask),
            exhaustMap((action) => this.taskService.addTask(action)
                .pipe(map((taskId: number) => tasksActions.createTaskSuccess(new Task(action.text, action.important, taskId, false))),
                    catchError((err: any) => of(tasksActions.createTaskFailure()))
                ))));

    removeTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.removeTask),
            exhaustMap((action) => this.taskService.removeTask(action.taskId)
                .pipe(map((_) => tasksActions.removeTaskSuccess({ taskId: action.taskId }),
                    catchError((err: any) => of(tasksActions.removeTaskFailure({ taskId: action.taskId }))))))));

    updateTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.completeTask),
            exhaustMap((action) => this.taskService.updateTask(action.Task)
                .pipe(map((_) => tasksActions.completeTaskSuccess({ taskId: action.Task.Id }),
                    catchError((err: any) => of(tasksActions.completeTaskFailure({ taskId: action.Task.Id}))))))));




    constructor(private actions: Actions,
                private taskService: TasksService) { }
}