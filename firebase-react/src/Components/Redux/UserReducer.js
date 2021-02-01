const intialState = {
  userAuthenticate: false,
  user: {},
  number: {},
  his: "./",
  error: null,
};
export default function (state = intialState, action) {
  switch (action.type) {
    case "USERNO":
      return {
        ...state,
        userAuthenticate:true,
        number: action.payload,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        userAuthenticate: true,
        user: action.payload,
      };
    case "ON_LOGOUT_SUCCESS":
      return {
        ...state,
        userAuthenticate: false,
        user: {},
      };
    default:
      return state;
  }
}
