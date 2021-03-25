import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as tasksActions from './tasks-actions';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Injectable()
export class MessagesEffects {

    notifyTaskCreated$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.createTaskSuccess),
            switchMap(() => {
                this.messagesService.success('Task was created successfully!');
                return of(null);
            })), { dispatch: false });

    notifyTaskCreationFailed$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.createTaskFailure),
            switchMap(() => {
                this.messagesService.error('Task could not be created.');
                return of(null);
            })), { dispatch: false });

    notifyTaskRemoved$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.removeTaskSuccess),
            switchMap(() => {
                this.messagesService.success('Task was removed successfully!');
                return of(null);
            })), { dispatch: false });

    notifyFailedToRemoveTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.removeTaskFailure),
            switchMap(() => {
                this.messagesService.error('Task could not be removed.');
                return of(null);
            })), { dispatch: false });

    notifyTaskCompleted$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.completeTaskSuccess),
            switchMap(() => {
                this.messagesService.success('Task was completed successfully!');
                return of(null);
            })), { dispatch: false });

    notifyFailedToCompleteTask$ = createEffect(() => this.actions
        .pipe(ofType(tasksActions.completeTaskFailure),
            switchMap(() => {
                this.messagesService.error('Task could not be completed.');
                return of(null);
            })), { dispatch: false });


    constructor(private actions: Actions,
                private messagesService: ToastrService) { }
}