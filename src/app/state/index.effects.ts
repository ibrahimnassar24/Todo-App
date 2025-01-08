import { TodoEffects } from "./todo/todo.effects";
import { AuthEffects } from "./auth/auth.effects";
import { ProfileEffects } from "./profile/profile.effects";
import { StatusEffects } from "./status/status.effects";

export const effects = [
    TodoEffects,
    AuthEffects,
    ProfileEffects,
    StatusEffects
];