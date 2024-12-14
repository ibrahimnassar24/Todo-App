import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of, map, mergeMap, catchError } from "rxjs";
import * as todoActions from './todo.actions';
import { Todo } from './todo.model';
import { TodoApiService } from '../../services/todo-api.service';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class TodoEffects {

    constructor(
        private todoApi: TodoApiService,
        private authService: AuthService
    ) { }

    getAllTodos$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$?.pipe(
            ofType(todoActions.getAllTodos),
            mergeMap(() => 
                from( this.todoApi.getAllTodos(this.authService.getCurrentUserUid() ) )
                .pipe(
                    map(data => todoActions.loadedSuccessfully({ todos: data as Todo[] })),
                    catchError(e => of(todoActions.failedToLoad({ error: e })))
                )
            )
        )
    });
}