import { createReducer, on } from "@ngrx/store";
import { Todo } from "./todo.model";
import * as todoActions from './todo.actions'

export interface TodoState {
    todos: Todo[];
    error: string | null;
    status: 'pending' | 'loading' | 'succeeded' | 'failed';
}

export const initialState: TodoState = {
    todos: [],
    error: null,
    status: 'pending'
};

export const todoReducer = createReducer(
    initialState,
    on(
        todoActions.getAllTodos,
        (s) => {
            const temp: TodoState = {
                todos: s.todos,
                error: null,
                status: 'loading'
            }

            return temp;
        }
    ),

    on(
        todoActions.loadedSuccessfully,
        (s, { todos }) => {
            const temp: TodoState = {
                todos,
                error: null,
                status: "succeeded"
            }

            return temp;
        }
    ),

    on(
        todoActions.failedToLoad,
        (s, { error }) => {
            const temp: TodoState = {
                ...s,
                error,
                status: "failed"
            }

            return temp;
        }
    )
);