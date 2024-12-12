import { TodoState } from "./todo/todo.reducer";
import { AuthState } from "./auth/auth.reducer";

export interface IndexState {
    todo: TodoState,
    auth: AuthState
}