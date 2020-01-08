import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import constants from "../services/constants";
import utils from "../services/utils";

export default class Cart extends React.Component {

  getCartTotal() {
    let total = constants.deliveryFee;

    this.props.cart.map(pizza => {
      total = total + pizza.quantity * pizza.price
    });

    return total;
  }

  incrementQuantity(currentQuantity, id) {
    this.props.onUpdateQuantity(id, currentQuantity + 1)
  }

  decrementQuantity(currentQuantity, id) {
    if (currentQuantity === 1) {
      this.props.onRemoveFromCart(id);
    } else {
      this.props.onUpdateQuantity(id, currentQuantity - 1);
    }
  }

  render() {
    if (this.props.cart.length) {
      return (
        <section className="section">
          <div className="container">
            <div className="title has-text-centered">Your cart</div>
            <div className="subtitle has-text-centered">{this.props.cart.length} item(s)</div>

            {this.props.cart.map(pizza => {
              return (
                <div className="columns is-vcentered card" key={pizza.id}>
                  <div className="column has-text-centered">
                    <figure className="image is-64x64 is-inline-block">
                      <img src={pizza.image_url} alt={pizza.name}/>
                    </figure>
                  </div>
                  <div className="column has-text-centered">
                    {pizza.name}
                  </div>
                  <div className="column has-text-centered">
                    {utils.displayInSelectedCurrency({
                      price: pizza.price,
                      currency: this.props.currency
                    })}
                  </div>
                  <div className="column has-text-centered">
                    <div style={{maxWidth: 100}} className="is-inline-block">
                      <div className="columns is-mobile">
                        <div className="column pointer">
                          <FontAwesomeIcon icon={faMinusCircle}
                                           onClick={() => this.decrementQuantity(pizza.quantity, pizza.id)}/>
                        </div>
                        <div className="column">
                          <div className="quantity">{pizza.quantity}</div>
                        </div>
                        <div className="column pointer">
                          <FontAwesomeIcon icon={faPlusCircle}
                                           onClick={() => this.incrementQuantity(pizza.quantity, pizza.id)}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column has-text-centered">
                    {utils.displayInSelectedCurrency({
                      price: pizza.price * pizza.quantity,
                      currency: this.props.currency
                    })}
                  </div>
                </div>
              );
            })}

            <div className="columns card">
              <div className="column is-hidden-mobile"></div>
              <div className="column is-hidden-mobile"></div>
              <div className="column is-hidden-mobile"></div>
              <div className="column has-text-centered">
                Delivery charges
              </div>
              <div className="column has-text-centered">
                {utils.displayInSelectedCurrency({
                  price: constants.deliveryFee,
                  currency: this.props.currency
                })}
              </div>
            </div>

            <div className="columns card">
              <div className="column is-hidden-mobile"></div>
              <div className="column is-hidden-mobile"></div>
              <div className="column is-hidden-mobile"></div>
              <div className="column has-text-centered">
                Total
              </div>
              <div className="column has-text-centered">
                {utils.displayInSelectedCurrency({
                  price: this.getCartTotal(),
                  currency: this.props.currency
                })}
              </div>
            </div>

            <div className="has-text-centered">
              <Link to="/address" className="button is-danger">Enter address</Link>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="section">
        <div className="container">
          <div className="title has-text-centered">Cart empty!</div>
          <div className="subtitle has-text-centered">Go to the menu and add some pizzas!</div>
        </div>
      </section>
    );
  }
}