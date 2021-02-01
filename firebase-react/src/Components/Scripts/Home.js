import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {userLogout} from './../Redux/Useraction'
class Home extends Component {
    constructor(props){
        super(props)
    }
    onLogoutClick = () => {
        this.props.userLogout(this.props.history);
        this.setState({temp:true})
      };
  render() {
    var user=this.props.user.user
    return (
      <div className="container pt-5">
        <div className="bg-light mt-5">
          <div className="jumbotron">
            <h1 className="display-4"><b>Hi {user.fname} {user.lname}</b></h1>
            <h4>you are loged in Successfully !!</h4>
            <hr className="my-4"></hr>
            <p>
            This is a Home page.
            </p>
            <button className="btn btn-info btn-lg" onClick={this.onLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps=state=>({
  user:state.auth
})
export default connect(mapStateToProps, { userLogout })(withRouter(Home));