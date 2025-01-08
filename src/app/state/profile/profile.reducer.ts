import { createReducer, on } from "@ngrx/store";
import { ProfileState } from "./profile.model";
import * as profileActions from "./profile.actions";

const initialValue: ProfileState = {
    displayName: "",
    email: "",
    phoneNumber: "",
    photoUrl: ""
};

export const profileReducer = createReducer(
    initialValue,

    on(
        profileActions.setProfileInitialValues,
        (s, { data}) => {
            const temp = { ...data };
            return temp;
        }
    ),


    on(
        profileActions.resetProfileValues,
        (s) => {
            const temp: ProfileState = {
                ...initialValue
            };
            
            return temp;
        }
    ),


    on(
        profileActions.updateDisplayNameCompleted,
        ( s, { displayName }) => {
            const temp: ProfileState = {
                ...s,
                displayName
            };

            return temp;
        }
    ),
    
    
    on(
        profileActions.updateEmailCompleted,
        ( s, { email }) => {
            const temp: ProfileState = {
                ...s,
                email
            };

            return temp;
        }
    ),
    
    
    on(
        profileActions.updatePhotoUrlCompleted,
        ( s, { photoUrl }) => {
            const temp: ProfileState = {
                ...s,
                photoUrl
            };

            return temp;
        }
    ),


    on(
        profileActions.updatePhoneNumberCompleted,
        ( s, { phoneNumber }) => {
            const temp: ProfileState = {
                ...s,
                phoneNumber
            };

            return temp;
        }
    )

);