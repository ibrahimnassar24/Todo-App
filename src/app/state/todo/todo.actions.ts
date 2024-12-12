import { createAction, props } from "@ngrx/store"
import { Todo } from "./todo.model";

export const getAllTodos = createAction("[Todo] Get All Todos");

export const loadedSuccessfully = createAction(
    "[Todo] Loaded Successfully",
    props<{ todos: Todo[] }>()
);

export const failedToLoad = createAction(
    "[Todo] Failed To Load",
    props<{ error: string }>()
);