import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of, map, mergeMap, catchError } from "rxjs";
import * as todoActions from './todo.actions';
import { Todo } from './todo.model';
import { TodoApiService } from '../../services/todo-api.service';

@Injectable()
export class TodoEffects {

    constructor(
        private todoApi: TodoApiService
    ) { }

    getAllTodos$ = createEffect(() => {
        const actions$ = inject(Actions);
        return actions$?.pipe(
            ofType(todoActions.getAllTodos),
            mergeMap(() => this.todoApi.getAllTodos()
                .pipe(
                    map(data => todoActions.loadedSuccessfully({ todos: data as Todo[] })),
                    catchError(e => of(todoActions.failedToLoad({ error: e })))
                )
            )
        )
    });
}