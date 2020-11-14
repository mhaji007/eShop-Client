import React from "react";
import StarRating from "react-star-ratings";
// [1, 4, 6, 7]
// 1 + 4 = 5
// 5 + 6 = 11
// 11 + 7 = 18

// Pass product
export const showAverage = (p) => {
  if (p && p.ratings) {

    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    console.log("totalReduced", totalReduced);

    let highest = length * 5;
    console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    console.log("result", result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating starDimension="20px" starSpacing="2px" starRatedColor="red" rating={result} editing={false} />
        {""}
        <span className="pl-3">({p.ratings.length})</span>
        </span>
      </div>
    );
  }
};
