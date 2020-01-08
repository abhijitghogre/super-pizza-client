import React from "react";
import api from "../services/api";
import Pizza from "./Pizza/Pizza";

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pizzas: []
    };
  }

  componentDidMount() {
    api.call({
      url: '/pizzas',
      method:'GET',
      handleSuccess: (result) => {
        this.setState({
          pizzas: result
        })
      },
      handleError: (error) => {
        console.error("error", error)
      }
    })
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.pizzas.map(pizza =>
              <Pizza
                currency={this.props.currency}
                pizza={pizza}
                key={pizza.id}
                cart={this.props.cart}
                onAddToCart={(pizza) => this.props.onAddToCart(pizza)}
                onRemoveFromCart={(id) => this.props.onRemoveFromCart(id)}
                onUpdateQuantity={(id, quantity) => this.props.onUpdateQuantity(id, quantity)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}