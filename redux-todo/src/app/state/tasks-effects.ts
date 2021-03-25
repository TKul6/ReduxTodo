import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../services/tasks-service';
import * as tasksActions from './tasks-actions';
import { catchError, exhaustMap, map, } from 'rxjs/operators';
import { Task } from '../task';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {

    createTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.createTask),
            exhaustMap((action) => this.taskService.addTask(action.task)
                .pipe(map((taskId: number) => tasksActions.createTaskSuccess(
                   {task: new Task(action.task.text, action.task.important, taskId, false)})),
                    catchError((err: any) => of(tasksActions.createTaskFailure()))
                ))));

    removeTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.removeTask),
            exhaustMap((action) => this.taskService.removeTask(action.taskId)
                .pipe(map((_) => tasksActions.removeTaskSuccess({ taskId: action.taskId }),
                    catchError((err: any) => of(tasksActions.removeTaskFailure({ taskId: action.taskId }))))))));

    updateTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.completeTask),
            exhaustMap((action) => this.taskService.updateTask(action.task)
                .pipe(map((_) => tasksActions.completeTaskSuccess({ taskId: action.task.Id }),
                    catchError((err: any) => of(tasksActions.completeTaskFailure({ taskId: action.task.Id}))))))));




    constructor(private actions: Actions,
                private taskService: TasksService) { }
}
