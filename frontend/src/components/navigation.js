import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return this.props.isSignedIn ? (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    onClick={() => {
                        this.props.onRouteChange('signIn');
                    }}
                    className="f4 link dim white  pa3 pointer shadow-1 mr3"
                >
                    Sign Out
                </p>
            </nav>
        ) : null;
    }
}

export default Navigation;
