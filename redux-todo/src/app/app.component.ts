import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state/reducer';
import { createTask } from './state/tasks-actions';
import { pendingOperation, selectTasks  } from './state/tasks-selectors';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

tasks$: Observable<ReadonlyArray<Task>>;
pendingOperation$: Observable<boolean>;

constructor(private store: Store<AppState>) {
  this.tasks$ = store.select(selectTasks);
  this.pendingOperation$ = store.select(pendingOperation);
}

public addTodo(text: string): void {

  this.store.dispatch(createTask(new Task(text)));
}

}
