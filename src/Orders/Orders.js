import React from "react";
import { Redirect } from "react-router-dom";
import api from "../services/api";
import utils from "../services/utils";

export default class Orders extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      unauthorised: false,
      isLoadingOrders: true,
      orders: []
    }
  }

  componentDidMount() {
    api.call({
      url: '/orders',
      method: 'GET',
      handleSuccess: (result) => {
        this.setState({
          orders: result,
          isLoadingOrders: false
        })
      },
      handleError: (error) => {
        this.setState({
          unauthorised: true
        })
      }
    })
  }

  render() {

    if (this.state.unauthorised) {
      return <Redirect to="/login"/>
    }

    if (!this.state.orders.length && !this.state.isLoadingOrders) {
      return (
        <div className="section">
          <div className="subtitle has-text-centered">No orders found. Visit our menu for delicious pizzas!</div>
        </div>
      );
    }

    const orders = this.state.orders.map(order => (
      <div className="box" key={order.id}>
        <div>
          <b>Order
            Id:</b> {order.id} | <b>Date:</b> {order.created_at} | <b>Items:</b> {order.suborders.length} |
          <b> Cost: </b> {utils.displayInSelectedCurrency(
          {
            price: order.cost + order.delivery_fee,
            currency: this.props.currency
          })}
        </div>
        <div>
          {order.suborders.map(suborder => (
            <div className="is-inline-block box" style={{margin: 5}}>
              <figure className="image is-64x64">
                <img src={suborder.pizza.image_url} alt={suborder.pizza.name}/>
              </figure>
              {suborder.pizza.name}
            </div>
          ))}
        </div>
      </div>
    ));

    return (
      <section className="section">
        <div className="container">
          {orders}
        </div>
      </section>
    );
  }
}