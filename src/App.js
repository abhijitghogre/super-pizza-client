import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.scss';
import Menu from "./Menu/Menu";
import Cart from "./Cart/Cart";
import Address from "./Address/Address";
import ThankYou from "./ThankYou/ThankYou";
import Header from "./Header/Header";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Orders from "./Orders/Orders";
import api from "./services/api";

export default class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
      currency: localStorage.getItem('currency') || 'usd',
      loggedInUser: false
    }
  }

  componentDidMount() {
    this.loginUser();
  }

  loginUser() {
    api.call({
      url: '/auth',
      method: 'GET',
      handleSuccess: (result) => {
        this.setState({
          loggedInUser: result
        })
      },
      handleError: (error) => {

      }
    })
  }

  currencySelect(currency) {
    localStorage.setItem('currency', currency);
    this.setState({
      currency
    })
  }

  addToCart({pizza}) {
    pizza.quantity = 1;
    this.setState({
      cart: [...this.state.cart, pizza]
    });

    localStorage.setItem('cart', JSON.stringify([...this.state.cart, pizza]));
  }

  removeFromCart({id}) {
    const filteredCart = this.state.cart.filter(pizza => {
      return pizza.id !== id;
    });
    this.setState({
      cart: filteredCart
    });

    if (this.state.cart.length) {
      localStorage.setItem('cart', JSON.stringify(filteredCart));
    } else {
      localStorage.removeItem('cart');
    }
  }

  updateQuantity({id, quantity}) {

    const updatedCart = this.state.cart.map(pizza => {
      if (pizza.id === id) {
        pizza.quantity = quantity
      }
      return pizza;
    });

    this.setState({
      cart: updatedCart
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  emptyCart() {
    localStorage.removeItem('cart');
    this.setState({
      cart: []
    });
  }

  logOutUser() {
    api.call({
      url: '/logout',
      method: 'POST',
      handleSuccess: (result) => {
        window.location.reload();
      },
      handleError: (error) => {
        window.location.reload();
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header cartCount={this.state.cart.length}
                    onCurrencySelect={(currency) => this.currencySelect(currency)}
                    currency={this.state.currency}
                    loggedInUser={this.state.loggedInUser}
                    onLogOut={() => this.logOutUser()}
            />
            <Switch>
              <Route exact path="/">
                <Menu
                  currency={this.state.currency}
                  cart={this.state.cart}
                  onAddToCart={(pizza) => this.addToCart({pizza})}
                  onUpdateQuantity={(id, quantity) => this.updateQuantity({id, quantity})}
                  onRemoveFromCart={(id) => this.removeFromCart({id})}
                />
              </Route>
              <Route path="/cart">
                <Cart
                  cart={this.state.cart}
                  currency={this.state.currency}
                  onUpdateQuantity={(id, quantity) => this.updateQuantity({id, quantity})}
                  onRemoveFromCart={(id) => this.removeFromCart({id})}
                />
              </Route>
              <Route path="/address">
                <Address
                  cart={this.state.cart}
                  onEmptyCart={() => this.emptyCart()}
                  loggedInUser={this.state.loggedInUser}
                />
              </Route>
              <Route path="/thank-you">
                <ThankYou/>
              </Route>
              <Route path="/login">
                <Login onLogin={() => this.loginUser()}/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
              <Route path="/orders">
                <Orders currency={this.state.currency}/>
              </Route>
            </Switch>
            <footer className="footer">
              <div className="content has-text-centered">
                <p>
                  &copy; Super Pizzas. Developed for Innoscripta.
                </p>
              </div>
            </footer>
          </div>
        </Router>
      </div>
    );
  }
}
