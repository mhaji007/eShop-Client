import React from "react";
import { Link } from "react-router-dom";
import { HistoryOutlined, KeyOutlined, HeartOutlined } from "@ant-design/icons";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
        <span><HistoryOutlined/> History</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
        <span><KeyOutlined /> Password</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link">
          <span><HeartOutlined /> Wishlist</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
