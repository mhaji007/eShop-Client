import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";



const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
        {/* <div> */}
          <AdminNav />
        </div>
        <div className="col">
          <h4>Admin Dashboard</h4>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
