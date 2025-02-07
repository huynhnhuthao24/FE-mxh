import React, { Component, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";
import logo from '../images/logo.png'

import Login from '../css/Login.css'
import Loading from '../loading/Loading';
import Grid from '@material-ui/core/Grid';
import { Typography , TextField,Input} from '@material-ui/core';
import Fade from 'react-reveal'
import { Button } from 'react-bootstrap';






class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            recaptcha: true,
            
        }
    }

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    handleChange = e => {
        this.setState({
            error: "",
            [e.target.name]: e.target.value
        });
    };

    clickSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = { email, password };
        // console.log(user);
        if (this.state.recaptcha) {
            signin(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false });
                } else {
                    // authenticate
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    });
                }
            });
        }  else {
            this.setState({
                loading: false,
                error: "What day is today? Please write a correct answer!"
            });
        }
        
    };

    signinForm = (email, password, loading, recaptcha) => (
        <form style={{ display: loading ? "none" : "" }} >
            <div className="form-group">
                
                <TextField
                    
                    
                    label="Email"
                    variant="outlined"
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                
                <TextField
                    
                    label="Password"
                    variant="outlined"
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                />
            </div>
           
            <Button onClick={this.clickSubmit} 
                    style={{display:"block",margin: "0 auto"}}
                    variant="outline-dark"
                    block
                    >
                        
                    Log In
            </Button>
        </form>
    )

    render() {
        
        const { email, password, error, redirectToReferer, loading, recaptcha } = this.state;
        if (redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <Grid container spacing={2} style={{overflowX:"hidden"}}  >
                <Grid item lg={7} sm={6} xs={12} >
                    <div className="left-login">
                        <Fade top >
                            <img className="img-logo" style={{display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"200px",marginBottom:"10px"}} src={require('../images/logo.png')} alt="logo"/>  
                        </Fade>
                        
                        <Fade left>
                            <Typography  variant="h4" color="inherit" style={{textAlign:"center",fontFamily: "Courgette",fontSize:"3vw"}} >
                               <div className="title-welcome">
                               Welcome to the Social App !
                               </div>
                                
                            </Typography>
                        </Fade>
                        <Fade up>
                            <Typography className="title-des" style={{textAlign:"center",fontFamily: "Time new roman",fontSize:"3vw"}} variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                                Ứng dụng vô địch siêu cấp vũ trụ 
                            </Typography>
                        </Fade>
                    </div>
                </Grid>
                <Grid item lg={5} sm={6}  xs={12}   >
                    <Fade right>
                    <div className="right-login">
                        <h2 style={{fontFamily: "Courgette",textAlign:"center"}}>Sign In</h2>
                        
                        <hr />
                        
                        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                            {error}
                        </div>
                        <div class="loading-login" >
                            
                        {loading ? (
                                <Loading />
                            ) : (
                                this.signinForm(email, password, loading,recaptcha)
                                )}
                           
                        </div>
                            
                            
                            
                        <p className="forgot-password">
                            <Link to="/forgot-password">
                                {" "}
                                <span style={{color:"black"}}>
                                Forgot Password
                                </span>
                            
                            </Link>
                        </p>
                        <hr/>
                        <div style={{textAlign:"center",fontFamily:"Courgette"}}>Or</div>
                        <p className="gg-login"><SocialLogin /></p>
                        
                        
                    </div>
                    </Fade>

                </Grid>
                
            </Grid>
        );
    }
}

export default Signin;