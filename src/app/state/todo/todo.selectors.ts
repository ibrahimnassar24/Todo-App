import { createSelector, createFeatureSelector } from "@ngrx/store";
import { TodoState } from "./todo.reducer";

const todoSelector = createFeatureSelector<TodoState>("todo");

export const selectAllTodos = createSelector(
    todoSelector,
    (s) => s.todos
);