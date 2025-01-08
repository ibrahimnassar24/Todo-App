import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Store } from '@ngrx/store';
import * as profileActions from './profile.actions';
import * as statusActions from "../status/status.actions";
import * as authActions from "../auth/auth.actions";
import { catchError, concatMap, from, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class ProfileEffects {

    constructor(
        private profileService: ProfileService,
        private store: Store
    ) { }

    updateDisplayName$ = createEffect(() => {
        const actions$ = inject(Actions);
        const store = this.store;

        return actions$.pipe(
            ofType(profileActions.updateDisplayName),

            tap((action) => {
                this.store.dispatch(
                    statusActions.initializeAction({ action: action.type })
                )
            }),

            concatMap(action => {
                return from(this.profileService.updateProfileDisplayName(action.displayName))
                    .pipe(
                        map(() => profileActions.updateDisplayNameCompleted({ displayName: action.displayName })),


                        catchError(e => of(
                            statusActions.actionFailed({
                                action: action.type,
                                error: e
                            })
                        ))
                    );
            }),

        );
    })


    updateDisplayNameCompleted$ = createEffect(() => {
        const actions$ = inject(Actions);
        const store = this.store;
        return actions$.pipe(
            ofType(profileActions.updateDisplayNameCompleted),
            map(action => statusActions.actionSucceeded({
                action: action.type
            }))
        );
    });


    updatePhotoUrl$ = createEffect(() => {
        const actions$ = inject(Actions);
        const store = inject(Store);
        return actions$.pipe(
            ofType(profileActions.updatePhotoUrl),

            tap((action) => {
                store.dispatch(
                    statusActions.initializeAction({ action: action.type })
                )
            }),

            concatMap(action => {
                return from(this.profileService.updateProfilePhotoUrl(action.photoUrl))
                    .pipe(
                        map(() =>
                            profileActions.updatePhotoUrlCompleted({ photoUrl: action.photoUrl })
                        ),

                        catchError(e => of(statusActions.actionFailed({
                            error: e,
                            action: action.type
                        })))
                    )
            }

            )

        );
    });

    updatePhotoUrlCompleted$ = createEffect( () => {
        const actions$ = inject(Actions);
        const store = this.store;

        return actions$.pipe(
            ofType( profileActions.updatePhotoUrlCompleted),

            map( action => statusActions.actionSucceeded({
                action: action.photoUrl
            }))
        )
    });


}