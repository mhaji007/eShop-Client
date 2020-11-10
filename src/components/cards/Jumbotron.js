import React from "react";
import styles from "./Jumbotron.module.css";
import classnames from "classnames";
import eShop from "../../images/eShop.jpg";
import TextLoop from "react-text-loop";


 const Jumbotron = () => {
  return (
    <div>

  <section className="jumbotron text-xs-center mb-3">
    <div className="container">

      <img src={eShop} className="pull-left mr-2" style={{width: "200px"}}/>

      <h1 className="jumbotron-heading">
      <p className="lead mr-3"> <TextLoop><h2 >Shop More.</h2><h2 >Save More.</h2><h2>See More.</h2></TextLoop><h2 >Pay Less.</h2></p>
      </h1>

    </div>
  </section>

    </div>
  )
}

  export default Jumbotron;

