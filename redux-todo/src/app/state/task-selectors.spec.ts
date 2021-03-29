import { Task } from '../task';
import { initialState } from './tasks-reducer';
import { selectPendingOperation, selectTaskCreated } from './tasks-selectors';

describe('TaskSelectors', () => {

    describe('select pending operation', () => {

        [[true, false, false],
        [false, true, false],
        [false, false, true]].forEach((data: Array<boolean>) => {

            it('should emit true if at least one task modification is in progress.', () => {


                // Arrange
                const state = { ...initialState };

                state.creatingTask = data[0];
                state.removingTask = data[1];
                state.updatingTask = data[2];

                // Act
                const result = selectPendingOperation.projector(state);

                // Assert
                expect(result).toBeTruthy();

            });

        });

        it('should emit false if there is no task being modified.', () => {

            // Arrange
            const state = { ...initialState };

            state.creatingTask = false;
            state.removingTask = false;
            state.updatingTask = false;

            // Act
            const result = selectPendingOperation.projector(state);

            // Assert
            expect(result).toBeFalsy();
        });

    });


    describe('task created', () => {

        [true, false].forEach((creatingTask: boolean) => 
        it('should return an object with the last value of creating task and the current count of the tasks.', () => {

            // Arrange
            const state = {...initialState};

            const tasks = [new Task('test'), new Task('test'), new Task('test')];

            state.creatingTask = creatingTask;
            state.tasks = tasks;

            // Act
            const result = selectTaskCreated.projector(state);

            // Assert
            expect(result.creatingTask).toBe(creatingTask);
            expect(result.tasksCount).toBe(tasks.length);


        }));

    });

});
