export const searchReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      // Spread is useful when there are
      // more than one object in the state

      // payload will be text (search text)
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
