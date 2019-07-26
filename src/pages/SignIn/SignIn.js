import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToken } from '../../actions/signInActions';
import { NavLink } from 'react-router-dom';
import axios from "axios";

import './SignIn.scss';

class SignIn extends Component {

  state = {
    userName: '',
    password: '',
    errors: {
        userName: '',
        password: '',
    },
    formError : '',
    submitted: false
  }

  componentDidMount = () =>{
    sessionStorage.clear();
  }

  handleChange = ({ target }) => {
    let errors = this.state.errors;
    const name = target.name;
    const value = target.value;
    switch (name) {
        case 'userName': 
          errors.userName = 
            value.length < 1
              ? 'Please Enter username'
              : '';
          break;
        case 'password': 
          errors.password = 
            value.length < 1
              ? 'Please Enter password'
              : '';
          break;
        default:
          break;
    }
    this.setState({[name]:value, submitted: false});
  };
  handleSubmit = (event) =>{
    event.preventDefault();
    const {userName, password} = this.state;
    this.setState({submitted:true});
    let userData = {
        username : userName,
        password : password,
    }
    if(this.validateForm(this.state.errors)) {
        this.login(userData).then(res => {
            console.log(res);
            let expiration = new Date();
            expiration.setTime(expiration.getTime() + (60*60000));
            window.sessionStorage.setItem("username", userName);
            window.sessionStorage.setItem("expiry", expiration.getTime());
            this.props.history.push('/dashboard');
        }).catch(err => 
          {
              console.log(err.response);
              this.setState({formError: err.response.data.error});
          }
        );
    }else{
        console.error('Invalid Form');
    }
  }

  login = (userData) =>{
    return axios.post("http://178.128.233.31/frontend/login", userData);
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
    return (
      <div className="signin-container">
        <div >
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" 
                      className="form-control" 
                      id="userName" 
                      name="userName" 
                      placeholder="Username" 
                      value={this.state.userName}
                      onChange={this.handleChange}
                    ></input>
                    <div className='error'> 
                    {
                        errors.userName.length > 0 && submitted &&
                        <p>{errors.userName}</p>
                    }
                    </div>
                </div>
                <div className="form-group">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      placeholder="Password"
                      name="password" 
                      value={this.state.password}
                      onChange={this.handleChange}
                    ></input>
                    <div className='error'> 
                    {
                        errors.password.length > 0 && submitted &&
                        <p>{errors.password}</p>
                    }
                    </div>
                </div>
                <div className='error'> 
                    {
                        formError.length > 0  &&
                        <p>{formError}</p>
                    }
                </div>
                <div>
                    <button type="submit" name="signIn" className="btn btn-info signin-btn">Login</button>
                </div>
            </form>
        </div>
        <div className="signup-options-container">
            <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
            <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    UserStore: state.UserStore
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchToken,
            },
            dispatch
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)
