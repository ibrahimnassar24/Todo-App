import { createAction, props } from "@ngrx/store";
import { User, AuthError, UserInfo } from "firebase/auth";

export const signUp = createAction(
    "[Auth] Sign Up",
    props<{ email: string, password: string }>()
);

export const signInWithEmailAndPassword = createAction(
    "[Auth] Sign In With Email And Password",
    props<{ email: string, password: string }>()
);

export const signInWithEmailLink = createAction(
    "[Auth] Sign In With Email Link",
    props<{ email: string }>()
);

export const confirmSigninLink = createAction(
    "[Auth] Confirm Sign In Link"
);

export const SignInWithGoogle = createAction(
    "[Auth] Sign In With Google"
);

export const signInWithFacebook = createAction(
    "[Auth] Sign In With Facebook"
);

export const confirmAuthentication = createAction(
    "[Auth] Confirm Authentication",
    props<{ user: UserInfo}>()
);

export const confirmSignOut = createAction(
    "[Auth] Confirm Sign Out"
);

export const initiateEmailVerification = createAction(
    "[Auth] Initiate Email Verification"
);

export const confirmEmailVerification = createAction(
    "[Auth] Confirm Email Verification"
);

export const initiatePasswordChange = createAction(
    "[Auth] Initiate Password Change"
);

export const confirmPasswordChange = createAction(
    "[Auth] Confirm Password Change"
);

export const updatePassword = createAction(
    "[Auth] Update Password",
    props<{ currentPassword: string, newPassword: string }>()
);

export const updateEmail = createAction(
    "[Auth] Update Email"
);

export const updateDisplayNameOrPhotoUrl = createAction(
    "[Auth] Update Display Name Or Photo Url",
    props<{ displayName?: string, photoUrl?: string}>()
);

export const signOut = createAction(
    "[Auth] Sign Out",
);

export const initiateAuthAction = createAction(
    "[Auth] Initiate Auth Action"
);

export const completeAuthAction = createAction(
    "[Auth] Complete Auth Action"
);


export const authActionFailed = createAction(
    "[Auth] Auth Action Failed",
    props<{ error: any, action: string }>()
);