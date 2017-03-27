export const defaultStore = {
  subscribe: () => {},
  getState: () => ({}),
  dispatch: () => {},
};

export const store = (state, dispatch) => (
  {
    subscribe: () => {},
    getState: () => (
      { ...state }
    ),
    dispatch,
  }
);
