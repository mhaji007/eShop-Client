import React from "react";
import styles from "./Jumbotron.module.css";
import classnames from "classnames";
import eShop from "../../images/eShop.jpg";


 const Jumbotron = () => {
  return (
    <div>

  <section className="jumbotron text-xs-center mb-3">
    <div className="container">

      <img src={eShop} className="pull-left mr-2" style={{width: "200px"}}/>
      <h1 className="jumbotron-heading">
      <p className="lead"> <h1>Shop More. <br/> Pay Less.</h1> </p>
      </h1>

    </div>
  </section>

    </div>
  )
}

  export default Jumbotron;

