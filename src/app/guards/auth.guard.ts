import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as selectors from "../state/auth/auth.selectors";
import { Observable, concatMap, from, map, mergeMap, tap } from "rxjs";
import { ValueChangeEvent } from '@angular/forms';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const isLogging = store.select(selectors.selectIsLogging);

  return from(waitUntilLoadingComplete(store))
    .pipe(
      concatMap(() => {
        return isLogging.pipe(
          map(v => {
            if (!v) {
              router.navigate(["/log"]);
              return false;
            } else {
              return true;
            }
          })
        )
      })
    );


};

function waitUntilLoadingComplete(store: Store) {
  return new Promise<void>((resolve, reject) => {
    store.select(selectors.selectStatus)
      .subscribe(value => {
        if (value != "pending") {
          resolve()
        }
      })
  });

}