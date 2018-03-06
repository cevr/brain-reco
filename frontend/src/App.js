import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';

import Navigation from './components/navigation';
import particleParams from './particleParams';
import './App.css';
import SignIn from './components/signIn/signIn.js';
import Register from './components/register/register.js';
import HomePage from './containers/homePage';
import Switch from './redux/redux-router';
import { checkSession } from './redux/asyncActions';

class App extends Component {
    componentDidMount() {
        this.props.checkSession();
    }

    render() {
        const { isSignedIn } = this.props;

        return (
            <div className="App">
                <Particles params={particleParams} className="particles" />
                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                <Switch>
                    <PrivateRoute
                        path="/home"
                        isSignedIn={isSignedIn}
                        component={HomePage}
                    />
                    <Route
                        path="/signIn"
                        render={() => (
                            <SignIn onRouteChange={this.onRouteChange} />
                        )}
                    />
                    <Route
                        path="/register"
                        render={() => (
                            <Register onRouteChange={this.onRouteChange} />
                        )}
                    />
                    <Redirect exact from="/" to="/signIn" />
                </Switch>
            </div>
        );
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            rest.isSignedIn ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/signIn'
                    }}
                />
            )
        }
    />
);

const mapStateToProps = state => {
    const { isSignedIn, id } = state.reducer;
    const { location } = state.router;
    return {
        isSignedIn,
        location,
        id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkSession: () => {
            dispatch(checkSession());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
