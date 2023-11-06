export const auth$ = {
  subscribe: (subscribeCallback: any) => {
    subscribeCallback({
      pending: false,
      error: 'Firebase: login',
      sessionToken: null,
    })
    return {
      unsubscribe: jest.fn(),
    }
  },
}
export const create = jest.fn()
export const login = jest.fn()
export const logout = jest.fn()
export const resetEmail = jest.fn()
export const changePassword = jest.fn()
export const updateUser = jest.fn()

export const setupAuthAsLoggedIn = (displayName = 'jack') => {
  auth$.subscribe = (subscribeCallback: any) => {
    subscribeCallback({
      displayName,
      pending: false,
      error: undefined,
      sessionToken: 'OK',
    })
    return {
      unsubscribe: jest.fn(),
    }
  }
}

export const setupAuthWithError = () => {
  auth$.subscribe = (subscribeCallback: any) => {
    subscribeCallback({
      pending: false,
      error: 'Firebase: login',
      sessionToken: null,
    })
    return {
      unsubscribe: jest.fn(),
    }
  }
}

export const setupAuthAsLoggedOut = () => {
  auth$.subscribe = (subscribeCallback: any) => {
    subscribeCallback({
      pending: false,
      error: undefined,
      sessionToken: null,
    })
    return {
      unsubscribe: jest.fn(),
    }
  }
}
