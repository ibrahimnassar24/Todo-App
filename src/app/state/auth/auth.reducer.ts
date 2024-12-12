import { createReducer, on } from "@ngrx/store";
import * as authActions from "./auth.actions";
import { Auth, User, UserInfo } from "firebase/auth";
import { AuthService } from "../../services/auth.service";
import { TemplateRef } from "@angular/core";

export interface AuthState {
    isLogging: boolean;
    user: UserInfo | null;
    error: any;
    status: "pending" | "loading" | "succeeded" | "failed"
}

export const initialValue: AuthState = {
    isLogging: false,
    user: null,
    error: null,
    status: "pending"
};

export const authReducer = createReducer(
    initialValue,


    on(authActions.initiateAuthAction,
        ( s ) => {
            const temp: AuthState = {
                ...s,
                status: "loading"
            };

            return temp;
        }
    ),


    on(authActions.completeAuthAction,
        ( s ) => {
            const temp: AuthState = {
                ...s,
                status: "succeeded"
            }

            return temp;
        }
    ),


    on(authActions.confirmAuthentication,
        (s, { user }) => {
            const temp: AuthState = {
                ...s,
                isLogging: true,
                user,
                error: null,
                status: "succeeded"
            };
            return temp;
        }
    ),


    on(authActions.confirmSignOut,
        (s) => {
            const temp: AuthState = {
                ...s,
                isLogging: false,
                user: null,
                error: null,
                status: "succeeded"
            };

            return temp;
        }
    ),


    on(authActions.authActionFailed,
        (s, { error, action }) => {
            const temp: AuthState = {
                ...s,
                error
            };
            return temp;
        }
    )
);