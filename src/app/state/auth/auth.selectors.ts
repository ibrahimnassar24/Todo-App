import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.model";

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


export const selectUserDetails = createSelector(
    authSelector,
    (s) => s.userDetails
);

export const selectEmail = createSelector(
    authSelector,
    (s) => s.userDetails.email
);

export const selectEmailVerified = createSelector(
    authSelector,
    (s) => s.userDetails.emailVerified
);

export const selectProviderId = createSelector(
    authSelector,
    (s) => s.userDetails.providerId
);

export const selectPhoneNumber = createSelector(
    authSelector,
    (s) => s.userDetails.phoneNumber
);

export const selectMfa = createSelector(
    authSelector,
    (s) => s.userDetails.mfa
);