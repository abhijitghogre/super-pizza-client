import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from "../services/api";

export default class Address extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      orderConfirmed: false
    }
  }

  render() {

    if (this.state.orderConfirmed) {
      return <Redirect to="/thank-you"/>
    }

    return (
      <section className="section">
        <div className="container">
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: this.props.loggedInUser ? this.props.loggedInUser.email : '',
              phone: '',
              address: '',
              zip_code: '',
            }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.phone) {
                errors.phone = 'Required'
              }
              if (!values.address) {
                errors.address = 'Required'
              }
              if (!values.zip_code) {
                errors.zip_code = 'Required'
              }
              return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                api.call({
                  url: '/orders',
                  method: 'POST',
                  body: {
                    customer_email: values.email,
                    address: values.address,
                    zip_code: values.zip_code,
                    phone: values.phone,
                    cart: this.props.cart
                  },
                  handleSuccess: (result) => {
                    this.props.onEmptyCart();
                    this.setState({
                      orderConfirmed: true
                    });
                  },
                  handleError: (error) => {
                    alert("Error processing order");
                    setSubmitting(false);
                  }
                });
              }, 400);
            }}
          >
            {({isSubmitting}) => (
              <Form>
                <div className="title has-text-centered">Please enter your address</div>
                <div className="subtitle has-text-centered">and contact details</div>
                <div className="box">
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                          <Field type="email" name="email" className="input" disabled={!!this.props.loggedInUser}/>
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faEnvelope}/>
                          </span>
                        </div>
                        <ErrorMessage name="email" component="p" className="help is-danger"/>
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Phone</label>
                        <div className="control has-icons-left">
                          <Field type="text" name="phone" className="input"/>
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faPhone}/>
                          </span>
                        </div>
                        <ErrorMessage name="phone" component="p" className="help is-danger"/>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Address</label>
                    <div className="control">
                      <Field component="textarea" name="address" className="textarea"/>
                    </div>
                    <ErrorMessage name="address" component="p" className="help is-danger"/>
                  </div>
                  <div className="columns">
                    <div className="column is-half">
                      <div className="field">
                        <label className="label">Zip code</label>
                        <div className="control">
                          <Field type="text" name="zip_code" className="input"/>
                        </div>
                        <ErrorMessage name="zip_code" component="p" className="help is-danger"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="has-text-centered">
                  <button type="submit" className="button is-danger" disabled={isSubmitting}>Confirm order
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    );
  }
}