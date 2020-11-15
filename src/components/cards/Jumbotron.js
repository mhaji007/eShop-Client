import React from "react";
import styles from "./Jumbotron.module.css";
import classnames from "classnames";
import eShop from "../../images/eShop.jpg";
import TextLoop from "react-text-loop";
import {Link} from "react-router-dom"
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
              <h2 className="display-3">Shop More.</h2>
              <h2 className="display-3">Save More.</h2>
              <h2 className="display-3">See More.</h2>
            </TextLoop>
            <h2 className="display-3">Pay Less.</h2>
          </div>

          <Link to="/" className="cta">Discover Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Jumbotron;
