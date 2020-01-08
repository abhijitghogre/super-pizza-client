import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import classNames from 'classnames';

export default class Header extends React.Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      isMenuOpen: false,

    }
  }

  openMenu() {
    this.setState({
      isMenuOpen: true
    });
  }

  closeMenu() {
    this.setState({
      isMenuOpen: false
    });
  }

  render() {
    return (
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <FontAwesomeIcon icon={faPizzaSlice} size="lg"/>
          </Link>

          <a role="button"
             className={classNames({'navbar-burger': true, burger: true, 'is-active': this.state.isMenuOpen})}
             onClick={() => this.state.isMenuOpen ? this.closeMenu() : this.openMenu()}
             aria-label="menu" aria-expanded="false"
             data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={classNames({'navbar-menu': true, 'is-active': this.state.isMenuOpen})}>
          <div className="navbar-start" onClick={() => this.closeMenu()}>
            <Link to="/" className="navbar-item">Menu</Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="select">
                <select value={this.props.currency}
                        onChange={(e) => this.props.onCurrencySelect(e.target.value)}>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                </select>
              </div>
            </div>
            <div className="navbar-item" onClick={() => this.closeMenu()}>
              <div className="buttons">

                {this.props.loggedInUser ? (
                  <>
                  <Link className="button is-primary" to="/orders">
                    <strong>My Orders</strong>
                  </Link>
                  <button className="button is-light" onClick={()=>this.props.onLogOut()}>
                    <strong>Logout</strong>
                  </button>
                  </>
                ) : (
                  <>
                    <Link className="button is-primary" to="/register">
                      <strong>Sign up</strong>
                    </Link>
                    <Link className="button is-light" to="/login">
                      Log in
                    </Link>
                  </>
                )}
                <Link className="button is-white" to='/cart'>
                  <span className="icon">
                    <FontAwesomeIcon icon={faShoppingCart}/>
                  </span>
                  {!!this.props.cartCount && <div className="count">({this.props.cartCount})</div>}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}