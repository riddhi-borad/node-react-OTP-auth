import React, { Component } from "react";
import firebase from "../Config/firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UserCheck } from "./../Redux/Useraction";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { phoneno: "",code:"" };
    this.handleclick = this.handleclick.bind(this);
  }
  oninputchange = (e) => {
    if (e.target.value.length > 10) {
      alert("Not enter more than 10 digit");
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    document.getElementById("nore").style.display = "none";
  };
 
  handleclick = () => {
    var numre = /^\d{10}$/;
    if (this.state.phoneno != this.state.phoneno.match(numre)) {
      document.getElementById("nore").style.display = "block";

      document.getElementById("nore").innerHTML =
        "Pleace Enter Valid 10 Digit No";
    } else {
      const thisclass = this;
      let recaptcha = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      firebase
        .auth()
        .signInWithPhoneNumber("+91" + this.state.phoneno, recaptcha)
        .then((e) => {
          let code = prompt("Enter The Otp");
          if (code == null) return false;
          e.confirm(code)
          .then((result) => {
            document.getElementById("recaptcha-container").style.display =
              "none";
            var obj = { phoneno: thisclass.state.phoneno };
            thisclass.props.UserCheck(obj, thisclass.props.history);
          })
          .catch(err=>{
            var msg="The SMS verification code used to create the phone auth credential is invalid."
            this.msgdispaly(msg)
          })
        
        })
        .catch(error=>{
          this.msgdispaly(error.message)
        });
      if (recaptcha != null) {
        document.getElementById("conti").style.display = "none";
      }
    }
  };
  tryagain=()=>{
    window.location.reload()
  }
  msgdispaly=(error)=>{
    document.getElementById("nore").style.display="block"
    document.getElementById("nore").innerHTML =error;
    document.getElementById("recaptcha-container").style.display =
        "none";
     var ele= document.getElementById("tryagain")
     ele.classList.add("d-block")
  }
  render() {
    const {phoneno,code}=this.state
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-center">
                  <h2>Sign-In</h2>
                </div>
                <div className="card-text mt-4">
                  <div className="input-group">
                    <span className="phoneno">+91</span>
                    <input
                      type="number"
                      id="numb"
                      className="form-control text-black"
                      name="phoneno"
                      style={{paddingLeft:"40px"}}
                      value={phoneno}
                      onChange={this.oninputchange}
                      placeholder="Mobile Number"
                    />
                  </div>
                  <span className="text-danger" id="nore"></span>
                </div>
                <div className="card-text mt-4">
                  <button
                    className="btn btn-block btn-info"
                    id="conti"
                    onClick={this.handleclick}
                  >
                    Continue
                  </button>
                </div>
                <div className="card-text">
                  <div id="recaptcha-container"></div>
                </div>
                <div className="card-text">
                  <label></label>
                </div>
                <div className="card-text">
                  <button className="btn btn-danger btn-block d-none" id="tryagain" onClick={this.tryagain}>Try Again</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { UserCheck })(withRouter(Login));
