declare module "@walcron/zelda-shared-context" {
export class Firebase {
    static getFirebaseInitializeApp: () => import("@firebase/app").FirebaseApp;
    static getAuth: () => import("firebase/auth").Auth;
}
export const credentials: {
    username: string;
    password: string;
};
/// <reference types="jest" />
export const mockAuth: jest.Mock<any, any, any>;
import { BehaviorSubject } from 'rxjs';
interface AuthProps {
    sessionToken: string | null;
    error: string | undefined;
    pending: boolean;
}
interface AuthPropsWithProfile extends AuthProps {
    isProfileUpdated: boolean;
}
type ChangePasswordProps = {
    isChanged: boolean;
    error: string | undefined;
};
export const SESSION_KEY = "sessionToken";
export declare const auth$: BehaviorSubject<AuthProps>;
export declare function create(username: string, password: string, displayName?: string): Promise<AuthPropsWithProfile>;
export declare function login(username: string, password: string): Promise<AuthProps>;
export declare function confirmPasswordResetEmail(code: string, newPassword: string): Promise<ChangePasswordProps>;
export declare function resetEmail(username: string, redirectUrl: string): Promise<ChangePasswordProps>;
export declare function changePassword(oldPassword: string, newPassword: string): Promise<ChangePasswordProps>;
export declare function logout(): Promise<void>;
export {};
import './__custom_mocks__/firebase/auth';
import 'whatwg-fetch';
export {};
}