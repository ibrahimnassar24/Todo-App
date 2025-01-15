import { Injectable, inject, ɵgetInjectableDef } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, concatMap, from, map, merge, mergeMap, of, tap, withLatestFrom } from "rxjs";
import * as authActions from "./auth.actions";
import * as authselectors from "./auth.selectors";
import { AuthService } from "../../services/auth.service";
import { Store } from "@ngrx/store";
import * as profileActions from "../profile/profile.actions";
// import { profileSelector } from "../profile/profile.selectors";

@Injectable()
export class AuthEffects {

    constructor(
        private authService: AuthService,
    ) { }


    signInWithEmailAndPassword$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.signInWithEmailAndPassword),
            mergeMap(action => {
                const { email, password } = action;

                return from(this.authService.signInUsingEmailAndPassword(email, password))
                    .pipe(
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: action.type
                        })))
                    );
            })
        )
    },
        {
            dispatch: false
        });


    signInWithLink$ = createEffect(() => {
        const actions$ = inject(Actions);

        return actions$.pipe(
            ofType(authActions.signInWithEmailLink),
            mergeMap(args => {
                const { email } = args;
                return from(this.authService.signInWithEmail(email))
                    .pipe(
                        map(() => authActions.initiateAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Sign In With Email Link"
                        })))
                    );
            })
        );
    });


    confirmSignInWithLink$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.confirmSigninLink),
            mergeMap(() => {
                return from(this.authService.confirmSignInWithLink())
                    .pipe(
                        map(() => authActions.completeAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Confirm Sign In Link"
                        })))
                    );
            })
        );

    });


    signInWithGoogle$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.SignInWithGoogle),
            mergeMap(() => {

                return from(this.authService.signInWithGoogle())
                    .pipe(
                        map(() => authActions.initiateAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Sign In With Google"
                        })))
                    )
            })
        );
    });


    signInWithFacebook$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.signInWithFacebook),
            mergeMap(() => {
                return from(this.authService.signInWithFacebook())
                    .pipe(
                        map(() => authActions.initiateAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Sign In With Facebook"
                        })))
                    );
            })
        );
    })





    signUp$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.signUp),
            mergeMap(action => {
                const { email, password } = action;
                return from(this.authService.signUpWithEmailAndPassword(email, password))
                    .pipe(
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: action.type
                        })))
                    );
            })
        );
    },
        {
            dispatch: false
        });


    signOut$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.signOut),
            mergeMap(() => {

                return from(this.authService.logOut())
                    .pipe(
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Sign Out"
                        })))
                    );
            })
        );
    },
        {
            dispatch: false
        });


    confirmSignOut$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.confirmSignOut),
            map(() => profileActions.resetProfileValues()),
            map(() => authActions.completeAuthAction())
        );
    });


    confirmAuthentication$ = createEffect(() => {
        const actions$ = inject(Actions);

        return actions$.pipe(
            ofType(authActions.confirmAuthentication),
            map(() => authActions.completeAuthAction())
        );
    });


    initiateemailVerification$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.initiateEmailVerification),
            mergeMap(() => {
                return from(this.authService.sendVerificationEmail())
                    .pipe(
                        map(() => authActions.initiateAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Email verification"
                        })))
                    );
            })
        );
    });


    updatePassword$ = createEffect(() => {
        const actions$ = inject(Actions);
        const store = inject(Store);
        return actions$.pipe(
            ofType(authActions.updatePassword),
            tap(() => store.dispatch(authActions.initiateAuthAction())),
            concatMap(action => {

                return from(this.authService.changePassword(action.currentPassword, action.newPassword))
                    .pipe(
                        map(() => authActions.completeAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: action.type
                        })))
                    )
            }

            )

        );
    });


    updateEmail$ = createEffect(() => {
        const store = inject(Store);
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.updateEmail),
            tap(() => store.dispatch(
                authActions.initiateAuthAction()
            )),

            mergeMap(action => {
                return from(this.authService.setEmail(action.email))
                    .pipe(
                        map(() => authActions.completeAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: action.type
                        })))
                    )
            })

        );
    });


    enrollTotp$ = createEffect(() => {
        const actions$ = inject(Actions);
        const store = inject(Store);

        return actions$.pipe(
            ofType(authActions.enrollTotp),

            tap(() => store.dispatch(authActions.initiateAuthAction())),

            mergeMap(action => {
                return from(this.authService.enrollTotp())
                    .pipe(
                        map(() => authActions.completeAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: action.type
                        })))
                    );
            })
        );
    });


    unenrollFromTotp$ = createEffect(() => {

        const actions$ = inject(Actions);
        const store = inject(Store);

        return actions$.pipe(
            ofType(authActions.unenrollFromTotp),

            tap(() =>
                store.dispatch(authActions.initiateAuthAction())
            ),

            mergeMap(action => {
                return from(this.authService.unenrollFromTotp(action.enrollmentId))
                    .pipe(
                        map(() => authActions.completeAuthAction()),
                        catchError(e => of(
                            authActions.authActionFailed({
                                error: e,
                                action: action.type
                            })
                        ))
                    )
            })
        );
    });

}