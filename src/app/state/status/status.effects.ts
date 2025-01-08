import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { withLatestFrom, tap } from "rxjs";
import { createEffect, Actions } from "@ngrx/effects";

@Injectable()
export class StatusEffects {

    constructor(
        private store: Store
    ) {}

        log$ = createEffect(() => {
            const actions$ = inject(Actions);
            const store = inject(Store);
            return actions$.pipe(
                withLatestFrom(store),
                tap(([action, state]) => {
                    console.log(action.type);
                    // console.log(state)
                })
            );
        },
            { dispatch: false });
    
        
}