import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const Publicroute=({component:Component, auth, ...rest})=>(
    <Route
        {...rest}
        render={props=>
            auth.userAuthenticate===false?(
                <Component {...props}></Component>
            ):
            (
                <Redirect to="/home"></Redirect>
            )
        }
    />
)

Publicroute.propTypes={
    auth:propTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(Publicroute);