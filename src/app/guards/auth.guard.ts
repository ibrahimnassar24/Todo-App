import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as selectors from "../state/auth/auth.selectors";
import { Observable, map, tap } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const isLogging = store.select(selectors.selectIsLogging);

  return isLogging.pipe(
    tap(value => {
      if (!value) {
        router.navigate(["/log"]);
      }
    }),
    map(value => value)
  );
};
