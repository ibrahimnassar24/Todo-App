import { User } from "firebase/auth";


export interface AuthState {
    isLogging: boolean;
    userDetails: UserDetails;
    error: any;
    status: "pending" | "loading" | "succeeded" | "failed"
}

export interface UserDetails {
    email: string | null;
    emailVerified: boolean | null;
    providerId: string | null;
    phoneNumber: string | null;
}

export const convertUserToUserdetails = (user: User) =>  {
    const temp: UserDetails = {
        email: user.email,
        emailVerified: user.emailVerified,
        providerId: user.providerId,
        phoneNumber: user.phoneNumber
    };

    return temp;
}
