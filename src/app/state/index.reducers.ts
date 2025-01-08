import { ActionReducerMap } from '@ngrx/store';
import { IndexState } from './index.state';
import { todoReducer } from './todo/todo.reducer';
import { authReducer } from './auth/auth.reducer';
import { profileReducer } from './profile/profile.reducer';
import { statusReducer } from './status/status.reducer';

export const reducers: ActionReducerMap<IndexState> = {
    todo: todoReducer,
    auth: authReducer,
    profile: profileReducer,
    status: statusReducer
};