declare module "@walcron/zelda-shared-context" {
export class Firebase {
    static getFirebaseInitializeApp: () => import("@firebase/app").FirebaseApp;
    static getAuth: () => import("firebase/auth").Auth;
}
export const credentials: {
    username: string;
    password: string;
};
import { BehaviorSubject } from 'rxjs';
type AuthProps = {
    sessionToken: string | null;
    error: string | undefined;
    pending: boolean;
};
export const SESSION_KEY = "sessionToken";
export declare const auth$: BehaviorSubject<AuthProps>;
export declare function create(username: string, password: string): Promise<AuthProps>;
export declare function login(username: string, password: string): Promise<AuthProps>;
export declare function logout(): void;
export {};
import './__custom_mocks__/firebase/auth';
import 'whatwg-fetch';
export {};
}