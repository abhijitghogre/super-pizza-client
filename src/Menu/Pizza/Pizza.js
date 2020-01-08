import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import classNames from 'classnames';
import constants from "../../services/constants";
import utils from "../../services/utils";

export default class Pizza extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      isProductDescriptionModalVisible: false
    }
  }

  showProductDescriptionModal() {
    this.setState({
      isProductDescriptionModalVisible: true
    });

    document.getElementsByTagName('html')[0].classList.add('is-clipped');
  }

  hideProductDescriptionModal() {
    this.setState({
      isProductDescriptionModalVisible: false
    });

    document.getElementsByTagName('html')[0].classList.remove('is-clipped');
  }

  getQuantityAddedToCart() {
    let quantityAdded = 0;
    if (this.props.cart) {
      this.props.cart.map(cartItem => {
        if (cartItem.id === this.props.pizza.id) {
          quantityAdded = cartItem.quantity;
        }
        return cartItem;
      });
    }
    return quantityAdded;
  }

  incrementQuantity() {
    const currentQuantity = this.getQuantityAddedToCart();
    this.props.onUpdateQuantity(this.props.pizza.id, currentQuantity + 1)
  }

  decrementQuantity() {
    const currentQuantity = this.getQuantityAddedToCart();
    if (currentQuantity === 1) {
      this.props.onRemoveFromCart(this.props.pizza.id);
    } else {
      this.props.onUpdateQuantity(this.props.pizza.id, currentQuantity - 1);
    }
  }

  render() {
    return (
      <div className="column is-one-quarter">
        <div className="card">
          <div className="card-image pointer" onClick={() => this.showProductDescriptionModal()}>
            <figure className="image is-4by3">
              <img src={this.props.pizza.image_url} alt="Placeholder"/>
            </figure>
          </div>
          <div className="card-content">
            <div className="title is-4">{this.props.pizza.name}</div>
            <div className="subtitle is-6">{utils.displayInSelectedCurrency({
              price: this.props.pizza.price,
              currency: this.props.currency
            })}
            </div>
            <div className="content ellipsis is-ellipsis-3 pointer" onClick={() => this.showProductDescriptionModal()}>
              {this.props.pizza.description}
            </div>
          </div>
          <footer className="card-footer">
            {
              this.getQuantityAddedToCart() > 0 ? (
                <>
                  <div className="card-footer-item">
                    <div className="columns is-mobile">
                      <div className="column pointer" onClick={() => this.decrementQuantity()}>
                        <FontAwesomeIcon icon={faMinusCircle}/>
                      </div>
                      <div className="column">
                        <div className="quantity">{this.getQuantityAddedToCart()}</div>
                      </div>
                      <div className="column pointer" onClick={() => this.incrementQuantity()}>
                        <FontAwesomeIcon icon={faPlusCircle}/>
                      </div>
                    </div>
                  </div>
                  <Link className="card-footer-item pointer" to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart}/>
                  </Link>
                </>
              ) : (

                <div className="card-footer-item pointer"
                     onClick={() => this.props.onAddToCart({
                       id: this.props.pizza.id,
                       name: this.props.pizza.name,
                       price: this.props.pizza.price,
                       image_url: this.props.pizza.image_url,
                     })}>
                  <div className="has-text-danger">Add to cart</div>
                </div>

              )
            }
          </footer>
        </div>
        <div className={classNames({modal: true, 'is-active': this.state.isProductDescriptionModalVisible})}
             id="productDescriptionModal">
          <div className="modal-background" onClick={() => this.hideProductDescriptionModal()}/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{this.props.pizza.name}</p>
              <button className="delete" aria-label="close" onClick={() => this.hideProductDescriptionModal()}/>
            </header>
            <section className="modal-card-body">
              <div style={{maxWidth: 200}}>
                <figure className="image is-4by3">
                  <img src={this.props.pizza.image_url} alt="Placeholder"/>
                </figure>
              </div>
              <br/>
              <div className="title is-6">
                {utils.displayInSelectedCurrency({
                  price: this.props.pizza.price,
                  currency: this.props.currency
                })}
              </div>
              <div className="content">
                {this.props.pizza.description}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}