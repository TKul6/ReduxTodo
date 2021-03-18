import { Pipe, PipeTransform } from '@angular/core';
import { completeTask } from './state/tasks-actions';
import { Task } from './task';

@Pipe({
  name: 'projectTasks'
})
export class ProjectTasksPipe implements PipeTransform {

  transform(tasks: ReadonlyArray<Task>, completedTasks: boolean): ReadonlyArray<Task> {
    if (!tasks) {
      return [];
    }


    return tasks.filter((task: Task) => task.completed === completedTasks);

  }

}
