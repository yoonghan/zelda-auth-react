export const auth$ = {
  subscribe: (callback: any) => {
    callback({
      pending: false,
      error: "message",
    });
    return {
      unsubscribe: jest.fn(),
    };
  },
};
export const login = jest.fn();
export const logout = jest.fn();
