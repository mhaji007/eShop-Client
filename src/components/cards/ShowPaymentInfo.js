// Component for displaying payment info
// used by History page

import React from "react";

const ShowPaymentInfo = ({ order }) => (
  <div >
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {" / "}
      <span>
        Amount:{" / "}
        {/* Division by 100 is done to convert from cents */}
        {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Orderd on:{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <br/>
      <span
      // Conditionally render style for each order status
        className={
          order.orderStatus === "Not Processed"
            ? "badge bg-secondary text-white"
            : order.orderStatus === "Processing"
            ? "badge bg-info text-white"
            : order.orderStatus === "Cancelled"
            ? "badge bg-danger text-white"
            : order.orderStatus === "Dispatched"
            ? "badge bg-primary text-white"
            : "badge bg-success text-white"
        }
      >
        STATUS: {order.orderStatus}
      </span>
    </p>
  </div>
);

export default ShowPaymentInfo;
