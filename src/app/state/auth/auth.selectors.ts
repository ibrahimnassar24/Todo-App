import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const authSelector = createFeatureSelector<AuthState>("auth");

export const selectIsLogging = createSelector(
    authSelector,
    (s) => s.isLogging
);

export const selectStatus = createSelector(
    authSelector,
    (s) => s.status
);

export const selectError = createSelector(
    authSelector,
    (s) => s.error
);

export const selectUser = createSelector(
    authSelector,
    (s) => s.user
);