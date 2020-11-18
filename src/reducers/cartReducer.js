// Redux state component
// used for storing products
// added to the cart
// Since multiple components/pages
// need access to the state of the cart
// there is a need to store the cart
// in redux state as well as local storage

// The intial state of all the cards
// to be updated with values from the
// local storage
let initialState = []

// Load  cart items from local storage
if (typeof window !=='undefined') {
  // If the cart array holding the product objects
  // is present in the local storage
  // store the array in the redux state
  if(localStorage.getItem('cart')) {
    initialState = JSON.parse(localStorage.getItem("cart"));
    // If not set the redux state to an empty array
  } else {
    initialState=[];
  }
}


export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};


