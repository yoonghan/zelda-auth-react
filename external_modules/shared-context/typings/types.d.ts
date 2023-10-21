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
import { AuthResponse, AuthWithProfileResponse } from './type/Auth';
import { ChangePasswordResponse, EmailPasswordResetResponse } from './type/ChangePassword';
export const SESSION_KEY = "sessionToken";
export declare const auth$: BehaviorSubject<AuthResponse>;
export declare function create(username: string, password: string, displayName?: string): Promise<AuthWithProfileResponse>;
export declare function login(username: string, password: string): Promise<AuthResponse>;
export declare function confirmPasswordResetEmail(code: string, newPassword: string): Promise<ChangePasswordResponse>;
export declare function resetEmail(username: string, redirectUrl: string): Promise<EmailPasswordResetResponse>;
export declare function changePassword(oldPassword: string, newPassword: string): Promise<ChangePasswordResponse>;
export declare function logout(): Promise<void>;
import './__custom_mocks__/firebase/auth';
import 'whatwg-fetch';
export interface AuthResponse {
    sessionToken: string | null;
    error: string | undefined;
    pending: boolean;
}
export interface AuthWithProfileResponse extends AuthResponse {
    isProfileUpdated: boolean;
}
export type ChangePasswordResponse = {
    isChanged: boolean;
    error: string | undefined;
};
export type EmailPasswordResetResponse = {
    isSent: boolean;
    error: string | undefined;
};
export {};
}