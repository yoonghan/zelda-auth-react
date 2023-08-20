export const auth$ = {
  subscribe: (callback: any) => {
    callback({
      pending: false,
      error: "message",
      sessionToken: null,
    });
    return {
      unsubscribe: jest.fn(),
    };
  },
};
export const login = jest.fn();
export const logout = jest.fn();
