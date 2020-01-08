import React from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from "../services/api";
import swal from '@sweetalert/with-react';

export default class Login extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      formSubmitted: false
    }
  }

  render() {

    if (this.state.formSubmitted) {
      return <Redirect to="/orders"/>
    }

    return (
      <section className="section">
        <div className="container">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'Required'
              }
              return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                api.call({
                  url: 'login',
                  method: 'POST',
                  body: {
                    email: values.email,
                    password: values.password
                  },
                  handleSuccess: (result) => {
                    this.props.onLogin();
                    this.setState({
                      formSubmitted: true
                    });
                  },
                  handleError: (error) => {
                    swal(
                      <p>{error.errors ? error.errors[Object.keys(error.errors)[0]] : error.message}</p>
                    );
                    setSubmitting(false);
                  }
                });
              }, 400);
            }}
          >
            {({isSubmitting}) => (
              <Form>
                <div className="title has-text-centered">Login</div>
                <div className="box">

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <Field type="email" name="email" className="input"/>
                    </div>
                    <ErrorMessage name="email" component="p" className="help is-danger"/>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <Field type="password" name="password" className="input"/>
                    </div>
                    <ErrorMessage name="password" component="p" className="help is-danger"/>
                  </div>

                </div>
                <div className="has-text-centered">
                  <button type="submit" className="button is-danger" disabled={isSubmitting}>Login
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