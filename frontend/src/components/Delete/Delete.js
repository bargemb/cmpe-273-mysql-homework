import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from "react-cookies";

class Delete extends Component{
    constructor(props){
        super(props);
        this.state = {
            students : [],
            deletedFlag: false
        }
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete = (e) =>{
        axios.delete(`http://localhost:3001/delete/${e.target.value}`)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        deletedFlag : true
                    })
                }else{
                    this.setState({
                        deletedFlag : false
                    })
                }
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
                    <td>
                        <button className="btn btn-success" type="submit" name="dbutton"
                                value={student.id} id={student.id}
                                onClick = {this.handleDelete}>Delete
                        </button></td>
                </tr>
            )
        })

        console.log(details);
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }

        if(this.state.deletedFlag){
            redirectVar = <Redirect to= "/home"/>
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

export default Delete;