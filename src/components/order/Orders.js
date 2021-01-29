import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <Table className="table table-bordered">
      <Thead className="thead-light">
        <Tr>
          <Th scope="col">Title</Th>
          <Th scope="col">Price</Th>
          <Th scope="col">Brand</Th>
          <Th scope="col">Color</Th>
          <Th scope="col">Count</Th>
          <Th scope="col">Shipping</Th>
        </Tr>
      </Thead>
   

      <Tbody>
        {order.products.map((p, i) => (
          <Tr key={i}>
            <Td>
              <b>{p.product.title&& p.product.title}</b>
            </Td>
            <Td>{p.product.price}</Td>
            <Td>{p.product.brand}</Td>
            <Td>{p.color}</Td>
            <Td>{p.count}</Td>
            <Td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">Delivery Status</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
