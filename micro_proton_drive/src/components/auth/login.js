import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { loginUser } from '../../actions';
import { api_login } from '../../api';

const form = reduxForm({
  form: 'login'
});

class Login extends Component {

  handleFormSubmit(formProps) {
    console.log(formProps);

    api_login(formProps.email, formProps.password)
      .then((response) => {
        this.props.loginUser(response.data.token);
      }).catch((e) => {
        console.log('login failed');
      });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
          <div>
            <label>Email</label>
            <Field name="email" className="form-control" component="input" type="text" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" className="form-control" component="input" type="password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loginUser: function (data) {
      dispatch(loginUser(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(form(Login));
