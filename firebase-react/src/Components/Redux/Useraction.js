import axios from "axios";
import jwtDecode from "jwt-decode";

export const UserCheck = (data, history) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/UserCheck", data)
      .then((res) => {
        if (res.status == 200) {
          if (res.data == null) {
            dispatch(userNo(data));
            history.push("/register");
          } else {
            const { tokan } = res.data;
            const userData = jwtDecode(tokan);
            localStorage.setItem("user", tokan);
            dispatch(userLoginSuccess(userData));
            history.push("/home");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const userNo = (data) => {
  return {
    type: "USERNO",
    payload: data,
  };
};
export const userLoginSuccess = (user) => {
  return {
    type: "USER_LOGIN_SUCCESS",
    payload: user,
  };
};

export const onRegistration = (data, history) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/Registration", data)
      .then((res) => {
        if (res.status == 200) {
          const { tokan } = res.data;
          const userData = jwtDecode(tokan);
          localStorage.setItem("user", tokan);
          dispatch(userLoginSuccess(userData));
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const userLogout = (history) => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch(onLogoutSuccess());
    history.push("/");
  };
};
export const onLogoutSuccess=()=>{
    return {
        type:'ON_LOGOUT_SUCCESS',
    }
}