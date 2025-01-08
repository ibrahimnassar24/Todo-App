import { createAction, props } from "@ngrx/store";
import { ProfileState } from "./profile.model";

export const setProfileInitialValues = createAction(
    "[Profile] Set Profile Initial Values",
    props<{ data: ProfileState}>()
);


export const updateEmail = createAction(
    "[Profile] Update Email",
    props<{ email: string }>()
);


export const updateEmailCompleted = createAction(
    "[Profile] Update Email Completed",
    props<{ email: string }>()
);


export const updateDisplayName = createAction(
    "[Profile] Update Display Name",
    props<{ displayName: string }>()
);


export const updateDisplayNameCompleted = createAction(
    "[Profile] Update Display Name Completed",
    props<{ displayName: string }>()
);


export const updatePhotoUrl = createAction(
    "[Profile] Update Photo Url",
    props<{ photoUrl: string }>()
);

export const updatePhotoUrlCompleted = createAction(
    "[Profile] Update Photo Url Completed",
    props<{ photoUrl: string}>()
);


export const updatePhoneNumber = createAction(
    "[Profile] Update Phone Number",
    props<{ phoneNumber: string }>()
);

export const updatePhoneNumberCompleted = createAction(
    "[Profile] Update Phone Number Completed",
    props<{ phoneNumber: string}>()
);