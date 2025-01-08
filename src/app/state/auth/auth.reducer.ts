import { createReducer, on } from "@ngrx/store";
import * as authActions from "./auth.actions";
import { Auth, User, UserInfo } from "firebase/auth";
import { AuthService } from "../../services/auth.service";
import { TemplateRef } from "@angular/core";
import { AuthState, convertUserToUserdetails } from "./auth.model";

export const initialValue: AuthState = {
    isLogging: false,
    userDetails: {
        email: "",
        emailVerified: null,
        phoneNumber: "",
        providerId: ""
    },
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
                userDetails: user,
                error: null,
            };
            return temp;
        }
    ),


    on(authActions.confirmSignOut,
        (s) => {
            const temp: AuthState = {
                ...s,
                isLogging: false,
                userDetails: { ...initialValue.userDetails },
                error: null,
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