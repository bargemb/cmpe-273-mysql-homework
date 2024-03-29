import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    validateForm() {
        const inputs = document.querySelectorAll('input');
        const error = document.getElementById('requiredError');
        let isFormValid = true;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value === ""){
                error.textContent = inputs[i].name + " is required field";
                isFormValid = false;
                break;
            }
        }
        return isFormValid;
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();

        if (this.validateForm()) {
            const data = {
                username : this.state.username,
                password : this.state.password
            }
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/login',data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        this.setState({
                            authFlag : true
                        })
                    }else{
                        this.setState({
                            authFlag : false
                        })
                    }
                })
                .catch(onerror => {
                    if (onerror.response.status === 401){
                        document.getElementById('requiredError').textContent = "Invalid Credentials";
                    }
                    console.log(onerror.response);
                });
        }
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container">

                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Admin Login</h2>
                                <p>Please enter your username and password</p>
                            </div>

                            <div className="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" className="form-control"
                                       name="username" placeholder="Username" required={true}/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control"
                                       name="password" placeholder="Password" required={true}/>
                            </div>
                            <button onClick = {this.submitLogin} className="btn btn-primary">Login</button>
                            <div className="error" id="requiredError" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Login;