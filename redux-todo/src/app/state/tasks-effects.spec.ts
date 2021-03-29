import { getTestBed, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { TasksService } from '../services/tasks-service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Task } from '../task';
import { createTask, createTaskFailure, createTaskSuccess } from './tasks-actions';
import { cold, hot } from 'jasmine-marbles';
import { TaskEffects } from './tasks-effects';

describe('TasksEffects', () => {
    let actions$ = new Observable<Action>();

    let tasksEffects: TaskEffects;

    const tasksServiceMock = jasmine.createSpyObj('TasksService', ['addTask', 'removeTask', 'updateTask']);
    const TASK_ID = 6;
    const TASK_TEXT = 'test';


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: TasksService, useValue: tasksServiceMock },
            provideMockActions(() => actions$),
                TaskEffects]
        });

        tasksEffects = getTestBed().inject(TaskEffects);

    });

    describe('create new task', () => {

        beforeEach(() => tasksServiceMock.addTask.calls.reset());

        it('should create new task.', () => {

            // Arrange
            tasksServiceMock.addTask.and.returnValue(of(TASK_ID));

            const taskToAdd = new Task(TASK_TEXT);

            const addedTask$ = cold('--b', { b: createTaskSuccess({ task: new Task(TASK_TEXT, false, TASK_ID) })});

            // Act
            actions$ = hot('--a', { a: createTask({ task: taskToAdd }) });

            // Assert
            expect(tasksEffects.createTask$).toBeObservable(addedTask$);
            expect(tasksServiceMock.addTask).toHaveBeenCalledTimes(1);
            expect(tasksServiceMock.addTask).toHaveBeenCalledWith(taskToAdd);

        });

        it('should handle errors from the server.', () => {

            // Arrange

            spyOn(console, 'error');

            tasksServiceMock.addTask.and.returnValue(throwError('error from test'));

            const taskToAdd = new Task(TASK_TEXT);

            const addedTaskFailed$ = cold('--b', { b: createTaskFailure()});

            // Act
            actions$ = hot('--a', { a: createTask({ task: taskToAdd }) });

            // Assert
            expect(tasksEffects.createTask$).toBeObservable(addedTaskFailed$);
            expect(tasksServiceMock.addTask).toHaveBeenCalledTimes(1);
            expect(tasksServiceMock.addTask).toHaveBeenCalledWith(taskToAdd);
            expect(console.error).toHaveBeenCalled();

        });

    });

});



