declare module "@walcron/zelda-shared-context" {
export class Firebase {
    static getFirebaseInitializeApp: () => import("@firebase/app").FirebaseApp;
    static getAuth: () => import("firebase/auth").Auth;
}
import { BehaviorSubject } from 'rxjs';
import { AuthResponse, AuthWithProfileResponse } from './type/Auth';
import { ChangePasswordResponse, EmailPasswordResetResponse } from './type/ChangePassword';
import type { RemoveUser } from './type/RemoveUser';
import type { UpdateUserRequest, UpdateUserResponse } from './type/UpdateUser';
import type { UpdateUserAdditionalInfo, UpdateUserAdditionalInfoResponse } from './type/updateUserAdditionalInfo';
export const SESSION_KEY = "sessionToken";
export declare const DISPLAYNAME_KEY = "displayToken";
export declare const ADDITIONALINFO_KEY = "additionalInfoToken";
export declare const auth$: BehaviorSubject<AuthResponse>;
export declare function create(username: string, password: string, displayName?: string): Promise<AuthWithProfileResponse>;
export declare function login(username: string, password: string): Promise<{
    sessionToken: string;
    displayName: string;
    error: string;
    pending: boolean;
}>;
export declare function confirmPasswordResetEmail(code: string, newPassword: string): Promise<ChangePasswordResponse>;
export declare function resetEmail(username: string, redirectUrl: string): Promise<EmailPasswordResetResponse>;
export declare function changePassword(oldPassword: string, newPassword: string): Promise<ChangePasswordResponse>;
export declare function logout(): Promise<void>;
export declare const updateUserLogin: (user: any) => void;
export declare function removeUser(): Promise<RemoveUser>;
export declare function updateUser(updateUserRequest: UpdateUserRequest): Promise<UpdateUserResponse>;
export declare function updateUserAdditionalInfo(updateUserAdditionalInfoRequest: Partial<UpdateUserAdditionalInfo>): Promise<UpdateUserAdditionalInfoResponse>;
export declare function getUserAdditionalInfo(): Promise<UpdateUserAdditionalInfo>;
export interface AuthResponse {
    sessionToken: string | null;
    displayName: string;
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
export type RemoveUser = {
    isRemoved: boolean;
    error?: string;
};
export type UpdateUserRequest = {
    displayName: string;
};
export type UpdateUserResponse = {
    isProfileUpdated: boolean;
    error?: string;
};
export type UpdateUserAdditionalInfo = {
    contacts: object[];
    mailingAddress: object;
    preferences: object;
};
export type UpdateUserAdditionalInfoResponse = {
    isAdditionaUserInfoUpdated: boolean;
    error: string;
};
}