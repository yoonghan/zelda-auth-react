export const auth$ = {
  subscribe: (callback: any) => {
    callback({
      pending: false,
      error: "Firebase: login",
      sessionToken: null,
    });
    return {
      unsubscribe: jest.fn(),
    };
  },
};
export const create = jest.fn();
export const login = jest.fn();
export const logout = jest.fn();
