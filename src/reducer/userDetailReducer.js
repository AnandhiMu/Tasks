const initialState = {
  userDetails: [],
};
export const userDetailReducer = (state = initialState, action) => {
  if (action.type === "SET_USER_DETAILS") {
    return { ...state, ...{ userDetails: action.payload } };
  }
  return state;
};
