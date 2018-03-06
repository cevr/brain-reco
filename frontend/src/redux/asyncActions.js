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

export const attemptLogout = userId => {
    return dispatch => {
        fetch('/logout', {
            method: 'POST',
            body: JSON.stringify({ id: userId }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(json => {
                if (json.res) {
                    dispatch(Action.logOut());
                    dispatch(push('/signIn'));
                } else {
                    console.log(json.status);
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

export const getFacialRecognitionData = input => {
    const calculateFaceLocation = data => {
        const face = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.querySelector('#inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height);

        return {
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width - face.right_col * width,
            bottomRow: height - face.bottom_row * height
        };
    };
    return dispatch => {
        fetch('/imageUrl', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        })
            .then(res => res.json())
            .then(json => {
                if (json.res) {
                    dispatch(
                        Action.setFaceRecognitionData(
                            calculateFaceLocation(json.data)
                        )
                    );
                } else {
                    console.log(json.status);
                }
            });
    };
};
