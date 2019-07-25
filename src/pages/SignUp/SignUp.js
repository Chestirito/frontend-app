import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import './SignUp.scss';

class SignUp extends Component {

    state = {
        userName: '',
        password: '',
        email:'',
        referralCode:'',
        errors: {
            userName: '',
            email: '',
            password: '',
            referralCode: ''
        },
        submitted: false
    }

    //handle input changes and record errors if requirements are not met
    handleChange = ({ target }) => {
        let errors = this.state.errors;
        const name = target.name;
        const value = target.value;
        switch (name) {
            case 'userName': 
              errors.userName = 
                value.length < 1
                  ? 'Name cannot be blank!'
                  : '';
              break;
            case 'email': 
              errors.email = 
                this.validateEmail(target.value)
                  ? ''
                  : 'Email is not valid!';
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be atleast 8 characters long!'
                  : '';
              break;
            case 'referralCode': 
                errors.referralCode = 
                value.length < 1
                    ? 'Referral code cannot be blank!'
                    : '';
            break;
            default:
              break;
        }
        this.setState({[name]:value});
    };

    validateEmail = (email) => {
        //eslint-disable-next-line
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({submitted:true});
        if(this.validateForm(this.state.errors)) {
            this.props.history.push('/signin');;
        }else{
            console.error('Invalid Form')
        }
    }

    //returns true if the properties of errors object are empty
    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    render(){
        const {errors, submitted} = this.state;
        return (<div className="signin-container">
                    <div >
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
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
                                    name="password" 
                                    placeholder="Password" 
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
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
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
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="referralCode" 
                                    name="referralCode" 
                                    placeholder="Referral code" 
                                    value={this.state.referralCode}
                                    onChange={this.handleChange}
                                ></input>
                                <div className='error'> 
                                {
                                    errors.referralCode.length > 0 && submitted &&
                                    <p>{errors.referralCode}</p>
                                }
                                </div>
                            </div>
                            <div >
                                <button 
                                    type="submit" 
                                    name="signIn" 
                                    className=" btn btn-info signup-btn"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="signup-options-container">
                        <NavLink to="/signIn" className="signup-link" >Sign In</NavLink>
                        <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>

                    </div>
                </div>)
    }
}

export default SignUp;
