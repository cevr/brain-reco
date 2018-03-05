import * as Action from './actions';
import { push } from 'react-router-redux';

export const attemptLogin = userInfo => {
    return dispatch => {
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                if (json.res) {
                    console.log('ATTEMPT LOGIN NAME', json.name);
                    dispatch(Action.logIn({ id: json.id, name: json.name }));
                    dispatch(Action.setEntryCount(json.entryCount));
                    dispatch(push('/home'));
                } else {
                    dispatch(Action.setError(json.status));
                    console.log(json);
                }
            });
    };
};

export const register = userInfo => {
    return dispatch => {
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                if (json.res) {
                    dispatch(push('/signIn'));
                } else {
                    dispatch(Action.setError(json.status));
                    console.log(json);
                }
            });
    };
};

export const updateEntryCount = userId => {
    return dispatch => {
        fetch('/image', {
            method: 'PUT',
            body: JSON.stringify({ id: userId }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                if (json.res) {
                    dispatch(Action.setEntryCount(json.entryCount));
                } else {
                    console.log(json);
                }
            });
    };
};

export const checkSession = () => {
    return dispatch => {
        fetch('/checkSession', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                if (json.res) {
                    dispatch(Action.logIn({ id: json.id, name: json.name }));
                    dispatch(Action.setEntryCount(json.entryCount));
                    dispatch(push('/home'));
                } else {
                    console.log(json.res);
                }
            });
    };
};
