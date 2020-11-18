import React from "react";
import styles from "./Jumbotron.module.css";
import classnames from "classnames";
import eShop from "../../images/eShop.jpg";
import TextLoop from "react-text-loop";
import { Link } from "react-router-dom";
// import Cube from "../loader/Cube";

const Jumbotron = () => {
  return (
    <div>
      <section className="jumbotron ">
        {/* <Cube  /> */}
        <div className="container ">
          <img
            src={eShop}
            className="pull-left mr-3"
            style={{ width: "200px" }}
          />

          <div className="lead display-2">
            <TextLoop>
              <h2 className="display-3">SHOP MORE.</h2>
              <h2 className="display-3">SAVE MORE.</h2>
              <h2 className="display-3">SEE MORE.</h2>
            </TextLoop>
            <h2 className="display-3 ">PAY LESS.</h2>
          </div>

          <Link to="/shop" className="cta">
            Discover Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Jumbotron;
