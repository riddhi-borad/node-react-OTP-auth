import React, { Component } from "react";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {onRegistration} from "./../Redux/Useraction"
class Registration extends Component {
  constructor(props){
    super(props);
    this.state={fname:"",lname:"",email:"",mobile:this.props.auth.number.phoneno}
    this.number();
  }
  number=()=>{
    if(this.props.auth.number.phoneno == null){
      this.props.history.push("/")
    }
  }
  oninputchange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  handlesubmit=()=>{
    if(this.state.fname=="" || this.state.lname=="" || this.state.email=="" || this.state.mobile==""){
      alert("Please fill all the details")
    }
    else{
    const obj={
      fName:this.state.fname,
      lName:this.state.lname,
      email:this.state.email,
      mobile:this.state.mobile,
    }
    this.props.onRegistration(obj,this.props.history)
  }
  }

  render() {
    const {fname,lname,email,mobile}=this.state
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
              <div className="card py-3">
                  <div className="card-head">
                      <h1 className="text-center">Registrtion</h1>
                  </div>
                  <div className="card-body">
                  <div className="card-text">
                    <div className="input-group"><input type="text" className="form-control" value={mobile} disabled></input></div>
                  </div>
                  <div className="card-text mt-4">
                    <div className="input-group"><input type="text" className="form-control" value={fname} name="fname" placeholder="First Name" onChange={this.oninputchange}></input></div>
                  </div>
                  <div className="card-text mt-4">
                    <div className="input-group"><input type="text" className="form-control" value={lname} name="lname" placeholder="Last Name" onChange={this.oninputchange}></input></div>
                  </div>
                  <div className="card-text mt-4">
                    <div className="input-group"><input type="email" className="form-control" value={email} name="email" placeholder="Email" onChange={this.oninputchange}></input></div>
                  </div>
                  <div className="card-text mt-4">
                <button className="btn btn-block btn-info" onClick={this.handlesubmit}>Submit</button>
                </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps=state=>({
  auth:state.auth
})
export default  connect(mapStateToProps,{onRegistration})(withRouter(Registration));