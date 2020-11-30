import React from "react";
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
        <div className="container">
          <div className="row">

            <img
              src={eShop}
              className="pull-left mr-3"
              style={{ maxWidth: "200px" }}
            />

            <col-mid-6>
              <div className="lead display-2">
                <TextLoop>
                  <span className="display-3 ">SHOP </span>
                  <span className="display-3 ">SAVE </span>

                </TextLoop>

                <span className="display-3"> MORE.</span>

                <h2 className="display-3 ">PAY LESS.</h2>
              </div>
            </col-mid-6>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-6 pl-0">
              <Link to="/shop" className="cta">
                Discover Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jumbotron;
