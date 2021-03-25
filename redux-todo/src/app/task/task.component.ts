import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { completeTask, removeTask } from '../state/tasks-actions';
import { State } from '../state/tasks-reducer';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {


  @Input()
  task: Task;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

  public removeTask() {

    this.store.dispatch(removeTask({taskId: this.task.Id}));
  }

  public completeTask() {
    this.store.dispatch(completeTask({task: this.task}));
  }

}
