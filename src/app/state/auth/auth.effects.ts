import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, concatMap, from, map, merge, mergeMap, of, tap, withLatestFrom } from "rxjs";
import * as authActions from "./auth.actions";
import * as authselectors from "./auth.selectors";
import { AuthService } from "../../services/auth.service";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthEffects {

    constructor(
        private authService: AuthService,
    ) {
    }

    log$ = createEffect(() => {
        const actions$ = inject(Actions);
        const store = inject(Store);
        return actions$.pipe(
            withLatestFrom(store.select(authselectors.authSelector)),
            tap(([action, state]) => {
                console.log(action.type);
                console.log(state)
            })
        );
    },
        { dispatch: false });

    signInWithEmailAndPassword$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.signInWithEmailAndPassword),
            mergeMap(credentials => {
                const { email, password } = credentials;
                return from(this.authService.signInUsingEmailAndPassword(email, password))
                    .pipe(
                        map(user => authActions.confirmAuthentication({ user: user.providerData[0] })),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "sign in With Email And Password"
                        })))
                    );
            })
        )
    })

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
            mergeMap(credentials => {
                const { email, password } = credentials;
                return from(this.authService.signUpWithEmailAndPassword(email, password))
                    .pipe(
                        map(user => authActions.confirmAuthentication({ user: user.providerData[0] })),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Sign Up With Email And Password"
                        })))
                    );
            })
        );
    })

    signOut$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.signOut),
            mergeMap(() => {

                return from(this.authService.logOut())
                    .pipe(
                        map(() => authActions.completeAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Sign Out"
                        })))
                    );
            })
        );
    })

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

    confirmEmailVerification$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$.pipe(
            ofType(authActions.confirmEmailVerification),
            mergeMap(() => {
                return from(this.authService.confirmVerificationEmail())
                    .pipe(
                        map(() => authActions.completeAuthAction()),
                        catchError(e => of(authActions.authActionFailed({
                            error: e,
                            action: "Confirm Verification Email"
                        })))
                    );
            })
        );
    });

    updateDisplayNameOrPhotoUrl$ = createEffect(() => {
        const actions$ = inject(Actions);
        const store = inject(Store);
        return actions$.pipe(
            ofType(authActions.updateDisplayNameOrPhotoUrl),
            tap( () => store.dispatch(authActions.initiateAuthAction())),
            concatMap(action => {

                return from(this.authService.updateProfileDisplyNameOrPhotoUrl(action))
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
}