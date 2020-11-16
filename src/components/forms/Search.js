import React, { useState } from "react";
// For redirecting user to shop page
import { useHistory } from "react-router-dom";
// For access to redux store and dispatching actions to redux store
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./Search.module.css";
import classnames from "classnames";
const Search = () => {
  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();
  // Destructure state from redux
  const { search } = useSelector((state) => ({ ...state }));
  // Destructure text from state (state = { text: "" })
  const { text } = search;

  const history = useHistory();

  // Dispatch input to redux
  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to shop page
    // It is on this page that we
    // get the value of the text and
    // make a request to backend
    // ino rder to display the results
    // Therefore we send the text
    // as a search query
    history.push(`/shop?${text}`);
  };

  return (
    // Execute handleSubmit upon enter
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        // Value is coming from
        // and controlled by redux state
        value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
      />
      {/* Execute handleSubmit upon clicking on the icon */}
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>

  );
};

export default Search;
