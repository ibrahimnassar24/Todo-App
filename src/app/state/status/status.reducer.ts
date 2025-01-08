import { createReducer, on } from "@ngrx/store";
import { StatusState } from "./status.model";
import * as statusActions from "./status.actions";


const initialValue: StatusState = {
    action: null,
    error: null,
    currentStatus: "pending"
};

export const statusReducer = createReducer(
    initialValue,

    on(
        statusActions.initializeAction,
        (s, { action})  => {
            const temp: StatusState = {
                action,
                error: null,
                currentStatus: "loading"
            };

            return temp;
        }
    ),

    on(
        statusActions.actionSucceeded,
        (s, { action }) => {
            const temp:StatusState = {
                action,
                error: null,
                currentStatus: "success"
            };

            return temp;
        }
    ),

    on(
        statusActions.actionFailed,
        (s, { action, error}) => {
            const temp: StatusState = {
                action,
                error,
                currentStatus: "failure"
            };

            return temp;
        }
    )
);