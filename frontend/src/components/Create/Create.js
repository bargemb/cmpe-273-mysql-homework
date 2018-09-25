import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(props){
        super(props);
        this.handleChangeStudentID = this.handleChangeStudentID.bind(this);
        this.handleChangeStudentName = this.handleChangeStudentName.bind(this);
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.handleStudentAdd = this.handleStudentAdd.bind(this);

        this.state = {
            studentID : null,
            name : null,
            department : null,
            studentAdded : false
        }
    }

    handleChangeStudentID = (e) => {
        this.setState({
            studentID : e.target.value
        })
    }

    handleChangeStudentName = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    handleChangeDepartment = (e) => {
        this.setState({
            department : e.target.value
        })
    }

    validateForm() {
        const inputs = document.querySelectorAll('input');
        const error = document.getElementById('requiredError');
        let isFormValid = true;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value === ""){
                error.textContent = inputs[i].placeholder + " is required field";
                isFormValid = false;
                break;
            }
        }
        return isFormValid;
    }

    handleStudentAdd = (e) => {
        if (this.validateForm()) {
            var data = {
                studentID : this.state.studentID,
                name : this.state.name,
                department : this.state.department
            }
            axios.post('http://localhost:3001/create',data)
                .then(response => {
                    if(response.status === 200){
                        this.setState({
                            studentAdded : true
                        })
                    }else{
                        this.setState({
                            studentAdded : false
                        })
                    }
            });
        }
    }

    render(){
        let redirect = null;
        if(this.state.studentAdded){
            redirect = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirect}
                <br/>
                <div class="container">
                    <div style={{width: '30%'}} class="form-group">
                        <input onChange = {this.handleChangeStudentID} type="number" class="form-control"
                               name="StudentID" placeholder="Student ID"/>
                    </div>
                    <br/>
                    <div style={{width: '30%'}} class="form-group">
                        <input onChange = {this.handleChangeStudentName} type="text" class="form-control"
                               name="StudentName" placeholder="Student Name"/>
                    </div>
                    <br/>
                    <div style={{width: '30%'}} class="form-group">
                        <input onChange = {this.handleChangeDepartment} type="text" class="form-control"
                               name="Department" placeholder="Department"/>
                    </div>
                    <br/>
                    <div style={{width: '30%'}}>
                        <button onClick = {this.handleStudentAdd} class="btn btn-success" type="submit">Add</button>
                    </div>
                    <div className="error" id="requiredError" />
                </div>
            </div>
        )
    }
}

export default Create;