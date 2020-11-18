// Redux state component
// used for storing user's search query
// from the searchbox input
// Since multiple components/pages
// need access to the search text,
// there is a need to store the search query
// in redux state as well as local storage

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
