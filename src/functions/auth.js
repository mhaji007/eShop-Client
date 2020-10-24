import axios from "axios"

// Function to send token to the backend api after log in
export const createOrUpdateUser = async(authtoken) => {
  // Body of the request is empty
  // body is not used since
  // Token will be sent in the headers
  return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
    headers: {
      authtoken,
    }
  });
}


// authToken is sent in because
// only then the middleWare from firebase
// can verify the token
export const currentUser = async(authtoken) => {
  // Body of the request is empty
  // body is not used since
  // Token will be sent in the headers
  return await axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {
    headers: {
      authtoken,
    }
  });
}
