import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";

import './ForgotPassword.scss';

class ForgotPassword extends Component {
  state = {
    email:'',
    errors: {
        email: ''
    },
    formError : '',
    submitted: false
  }

  handleChange = ({ target }) => {
    let errors = this.state.errors;
    const name = target.name;
    const value = target.value;
    errors.email = 
      this.validateEmail(value)
        ? ''
        : 'Email is not valid!';
    this.setState({[name]:value, submitted: false});
  };

  validateEmail = (email) => {
    //eslint-disable-next-line
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    const {email} = this.state;
    this.setState({submitted:true});
    let userData = {
        email: email
    }
    console.log(userData);
    if(this.validateForm(this.state.errors)) {
        this.reset(userData).then(res => {
            console.log(res);
            //this.props.history.push('/signin');
        }).catch(err => 
          {
              console.log(err.response);
              this.setState({errors: {email: err.response.data.msg}});
          }
        );
    }else{
        console.error('Invalid Form');
    }
  }

  reset = (userData) =>{
    return axios.post("http://178.128.233.31/frontend/reset_password", userData);
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  render(){
    const {errors, submitted, formError} = this.state;
    return <div className="signin-container">
        <div >
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                className="form-control"
                id="email" 
                placeholder="Email"
                name="email" 
                placeholder="Email" 
                value={this.state.email}
                onChange={this.handleChange}
              ></input>
              <div className='error'> 
              {
                  errors.email.length > 0 && submitted &&
                  <p>{errors.email}</p>
              }
              </div>
            </div>
            <div >
              <button type="submit" name="signIn" className=" btn btn-info fogotpwd btn">Forgot Password</button>
            </div>
          </form>
        </div>
        <div className="signup-options-container">
          <NavLink to="/signIn" className="signup-link">Sign In</NavLink>
          <NavLink to="/signUp" className="forgot-password-link">Sign Up</NavLink>

        </div>
      </div>
  }
}

export default ForgotPassword;
