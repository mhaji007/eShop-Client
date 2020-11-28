import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
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
                <b>{p.product.title}</b>
              </Td>
              <Td>{p.product.price}</Td>
              <Td>{p.product.brand}</Td>
              <Td>{p.color}</Td>
              <Td>{p.count}</Td>
              <Td>
                {p.product.shipping === "Yes" ? (
                  <CheckCircleOutlined className="text-info"/>
                ) : (
                  <CloseCircleOutlined className="text-danger" />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );

    const showDownloadLink = (order) => (
      <PDFDownloadLink
        document={<Invoice order={order} />}
        fileName="invoice.pdf"
        className="btn-block btn btn-sm btn-primary border border-info mt-2 text-info"
      >
        Download PDF
      </PDFDownloadLink>
    );


  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
           <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
        <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-2"> */}
        <div>
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
