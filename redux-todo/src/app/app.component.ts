import { ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { AppState } from './state/reducer';
import { createTask } from './state/tasks-actions';
import { selectTaskCreated, selectPendingOperation, selectTasks } from './state/tasks-selectors';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {


  tasks$: Observable<ReadonlyArray<Task>>;
  pendingOperation$: Observable<boolean>;

  text = '';

  private _subscriptions = new Array<Subscription>();

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.tasks$ = store.select(selectTasks);
    this.pendingOperation$ = store.select(selectPendingOperation);
  }
  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
  ngOnInit(): void {
    this.store.select(selectTaskCreated)
      .pipe(pairwise())
      .pipe(filter(([previousState, currentState]) =>
      previousState.creatingTask && !currentState.creatingTask && previousState.tasksCount < currentState.tasksCount))
      .subscribe(_ => {
        this.text = '';
        this.cdr.markForCheck();
      });
  }

  public addTodo(text: string): void {

    this.text = text;
    this.store.dispatch(createTask({ task: new Task(text) }));
  }

}
