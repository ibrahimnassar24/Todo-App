import { TodoState } from "./todo/todo.reducer";
import { AuthState } from "./auth/auth.model";
import { ProfileState } from "./profile/profile.model";
import { StatusState } from "./status/status.model";

export interface IndexState {
    todo: TodoState;
    auth: AuthState;
    profile: ProfileState,
    status: StatusState
}