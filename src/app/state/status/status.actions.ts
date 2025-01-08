import { createAction, props } from "@ngrx/store";

export const initializeAction = createAction(
    "[Status] Intialize Action",
    props<{ action: string}>()
);

export const actionSucceeded = createAction(
    "[Status] Action Succeeded",
    props<{ action: string}>()
);

export const actionFailed = createAction(
    "[Status] Action Failed",
    props<{ action: string, error: any}>()
);