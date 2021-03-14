import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state/reducer';
import { createTask } from './state/tasks-actions';
import { selectTasks  } from './state/tasks-selectors';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

tasks$: Observable<ReadonlyArray<Task>>;

constructor(private store: Store<AppState>) {
  this.tasks$ = store.select(selectTasks);
}

public addTodo(): void {
  this.store.dispatch(createTask(new Task('test')));
}

}
