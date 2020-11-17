// Reusable component for displaying star ratings
// on the shop page

import React from "react";
import StarRating from "react-star-ratings";

// numberofStars is the number of stars (1-5) displayed on the page
const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      // There will be no empty stars
      // all will be filled with color
      starEmptyColor="red"
    />
    <br />
  </>
);

export default Star;
