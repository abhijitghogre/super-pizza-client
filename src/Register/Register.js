import React from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from "../services/api";
import swal from '@sweetalert/with-react';

export default class Register extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      formSubmitted: false
    }
  }

  render() {

    if (this.props.loggedInUser) {
      return <Redirect to="/orders"/>
    }

    if (this.state.formSubmitted) {
      return <Redirect to="/login"/>
    }

    return (
      <section className="section">
        <div className="container">
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              password_confirmation: '',
            }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.name) {
                errors.name = 'Required'
              }
              if (!values.password) {
                errors.password = 'Required'
              }
              if (!values.password_confirmation) {
                errors.password_confirmation = 'Required'
              }
              if (values.password.length < 8) {
                errors.password = 'Password should be at least 8 characters long'
              }
              if (values.password !== values.password_confirmation) {
                errors.password_confirmation = 'Passwords do not match'
              }
              return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                api.call({
                  url: 'register',
                  method: 'POST',
                  body: {
                    email: values.email,
                    name: values.name,
                    password: values.password,
                    password_confirmation: values.password_confirmation
                  },
                  handleSuccess: (result) => {
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
                <div className="title has-text-centered">Register</div>
                <div className="box">

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <Field type="email" name="email" className="input"/>
                    </div>
                    <ErrorMessage name="email" component="p" className="help is-danger"/>
                  </div>

                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <Field type="text" name="name" className="input"/>
                    </div>
                    <ErrorMessage name="name" component="p" className="help is-danger"/>
                  </div>


                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <Field type="password" name="password" className="input"/>
                    </div>
                    <ErrorMessage name="password" component="p" className="help is-danger"/>
                  </div>


                  <div className="field">
                    <label className="label">Confirm password</label>
                    <div className="control">
                      <Field type="password" name="password_confirmation" className="input"/>
                    </div>
                    <ErrorMessage name="password_confirmation" component="p" className="help is-danger"/>
                  </div>

                </div>
                <div className="has-text-centered">
                  <button type="submit" className="button is-danger" disabled={isSubmitting}>Register
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