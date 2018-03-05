import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/asyncActions';
import { push } from 'react-router-redux';
class Register extends Component {
    state = {};

    onUsernameChange = event => {
        this.setState({
            username: event.target.value
        });
    };

    onEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    };

    onPasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    };

    onSubmitHandler = () => {
        const { username, email, password } = this.state;
        const payload = { username, email, password };
        console.log(payload);
        this.props.register(payload);
        push('/');
    };

    render() {
        return (
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center bg-white-70">
                <main className="pa4 black-80">
                    <fieldset
                        id="sign_up"
                        className="ba b--transparent ph0 mh0"
                    >
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label
                                className="userName
                                userName
                                userName
                                usernamedb fw6 lh-copy f6"
                            >
                                Username
                            </label>
                            <input
                                className="pa2 input-reset ba bg-transparent  hover-black w-100"
                                type="text"
                                id="username"
                                onChange={this.onUsernameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Email</label>
                            <input
                                className="pa2 input-reset ba bg-transparent  hover-black w-100"
                                type="email"
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6">
                                Password
                            </label>
                            <input
                                className="b pa2 input-reset ba bg-transparent  hover-black w-100"
                                type="password"
                                id="password"
                                onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="center justify-center flex">
                        <button
                            onClick={this.onSubmitHandler}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2"
                        >
                            Register
                        </button>
                    </div>
                    <div className="lh-copy mt3">
                        <Link to="/" className="f5 link dim black db pointer">
                            Already registered? Sign in
                        </Link>
                    </div>
                </main>
            </article>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: userInfo => {
            dispatch(register(userInfo));
        }
    };
};

export default connect(null, mapDispatchToProps)(Register);
