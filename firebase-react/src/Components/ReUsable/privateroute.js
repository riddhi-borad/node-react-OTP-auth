import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const Privateroute=({component:Component, auth, ...rest})=>(
    <Route
        {...rest}
        render={props=>
            auth.userAuthenticate===true?(     
                <Component {...props}></Component>
            ):
            (
                <Redirect to="/"></Redirect>
            )
        }
    />
)

Privateroute.propTypes={
    auth:propTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(Privateroute);