// Loading skeleton component used in home page

import React from "react";
import { Card, Skeleton } from "antd";
// Render card skeletons based on count
const LoadingCard = ({ count }) => {

  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-2 m-2">
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };
  // Render skeletons in a row (<div className="row m-0"></div>) as columns (<Card className="col-md-2 m-2">...</Card>)
  return <div className="row m-0 justify-content-center pb-5 ">{cards()}</div>;
};

export default LoadingCard;
