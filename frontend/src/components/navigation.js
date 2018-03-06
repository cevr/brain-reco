import React, { Component } from 'react';
import { connect } from 'react-redux';
import { attemptLogout } from '../redux/asyncActions';
class Navigation extends Component {
    render() {
        return this.props.isSignedIn ? (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    onClick={() => {
                        this.props.logOut(this.props.email);
                    }}
                    className="f4 link dim white  pa3 pointer shadow-1 mr3"
                >
                    Sign Out
                </p>
            </nav>
        ) : null;
    }
}

const mapStateToProps = state => {
    const { email } = state.reducer;
    return {
        email
    };
};
const mapDispatchToProps = dispatch => {
    return {
        logOut: userId => {
            dispatch(attemptLogout(userId));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
