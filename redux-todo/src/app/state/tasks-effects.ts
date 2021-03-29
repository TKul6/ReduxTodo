import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksService } from '../services/tasks-service';
import * as tasksActions from './tasks-actions';
import { catchError, exhaustMap, map, } from 'rxjs/operators';
import { Task } from '../task';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {

    public createTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.createTask),
            exhaustMap((action) => this.taskService.addTask(action.task)
                .pipe(map((taskId: number) => tasksActions.createTaskSuccess(
                    { task: new Task(action.task.text, action.task.important, taskId, false) })),
                    catchError((err: any) => {
                        console.error('Failed to create task.');
                        return of(tasksActions.createTaskFailure());
                    })
                ))));


    removeTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.removeTask),
            exhaustMap((action) => this.taskService.removeTask(action.taskId)
                .pipe(map((_) => tasksActions.removeTaskSuccess({ taskId: action.taskId }),
                    catchError((err: any) => {
                        console.error('Failed to remove task with id ', action.taskId);
                        return of(tasksActions.removeTaskFailure({ taskId: action.taskId }));
                    }))))));

    updateTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.completeTask),
            exhaustMap((action) => this.taskService.updateTask(action.task)
                .pipe(map((_) => tasksActions.completeTaskSuccess({ taskId: action.task.Id }),
                    catchError((err: any) => {
                        console.error('Failed to update task with id ', action.task.Id)
                        return of(tasksActions.completeTaskFailure({ taskId: action.task.Id }));
                    }))))));

    constructor(private actions: Actions,
                private taskService: TasksService) { }
}
