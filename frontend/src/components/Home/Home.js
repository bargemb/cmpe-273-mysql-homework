import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            students : []
        }
    }
    //get the students data from backend
    componentDidMount(){
        axios.get('http://localhost:3001/home')
            .then((response) => {
                this.setState({
                    students : this.state.students.concat(response.data)
                });
            });
    }

    render(){
        //iterate over students to create a table row
        let details = this.state.students.map(student => {
            return(
                <tr>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.department}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container">
                    <h2>List of All Students</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>Department</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*Display the Tbale row based on data recieved*/}
                        {details}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
//export Home Component
export default Home;