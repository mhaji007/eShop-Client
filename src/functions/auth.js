import axios from "axios"

// Function to send token to the backend api after log in
export const createOrUpdateUser = async(authToken) => {
  // Body of the request is empty
  // body is not used since
  // Token will be sent in the headers
  return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
    headers: {
      authToken,
    }
  });
}
