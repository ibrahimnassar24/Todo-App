import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatusState } from "./status.model";

export const statusSelector = createFeatureSelector<StatusState>("status");

export const selectError = createSelector(
    statusSelector,
    (s) => s.error
);

export const currentStatus = createSelector(
    statusSelector,
    (s) => s.currentStatus
);