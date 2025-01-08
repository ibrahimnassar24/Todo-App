import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./profile.model";

export const profileSelector = createFeatureSelector<ProfileState>("profile");

export const selectDisplayName = createSelector(
    profileSelector,
    (s) => s.displayName
);

export const selectEmail = createSelector(
    profileSelector,
    (s) => s.email
);

export const selectPhotoUrl = createSelector(
    profileSelector,
    (s) => s.photoUrl
);

export const selectPhoneNumber = createSelector(
    profileSelector,
    (s) => s.phoneNumber
);