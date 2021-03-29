import { InitialState } from '@ngrx/store/src/models';
import { Task } from '../task';
import { appReducer } from './reducer';
import { createTask, createTaskFailure, createTaskSuccess } from './tasks-actions';
import { initialState, State } from './tasks-reducer';


describe('TasksReducer', () => {

    let state: State;

    beforeEach(() => state = { ...initialState });

    const TASK = new Task('test');


    const reducer = appReducer.tasksManagement;

    describe('create new task', () => {

        it('should change the creatingTask to true', () => {


            // Act
            state = reducer(state, createTask({ task: TASK }));

            // Assert
            expect(state.creatingTask).toBeTrue();


        });

        it('should add the task to the collection and set the creatingTask to false', () => {

            // Arrange
            state = { ...state, creatingTask: true };

            // Act
            const resultState = reducer(state, createTaskSuccess({ task: TASK }));

            // Assert
            expect(resultState.creatingTask).toBeFalse();
            expect(resultState.tasks).toContain(TASK);

        });

        it('should set the createTask to false on error', () => {

            // Arrange
            state = { ...state, creatingTask: true };

            // Act
            const resultState = reducer(state, createTaskFailure());

            // Assert
            expect(resultState.creatingTask).toBeFalse();

        });
    });

});
