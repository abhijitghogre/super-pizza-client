import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default class ThankYou extends React.Component {
  render() {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <FontAwesomeIcon icon={faCheckCircle} style={{fontSize: 50}}/>
          <br/>
          <br/>
          <div className="subtitle">Your order has been placed. <br/> Your Super Pizza is on the way.</div>
        </div>
      </section>
    );
  }
}