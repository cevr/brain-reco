import React, { Component } from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './brain.png';
class Logo extends Component {
    render() {
        return (
            <div className="ma4 mt0">
                <Tilt
                    className="Tilt br2 shadow-2 "
                    options={{ max: 25 }}
                    style={{ height: 150, width: 150 }}
                >
                    <div className="Tilt-inner">
                        {' '}
                        <img className="pa3 pt4" alt="logo" src={brain} />{' '}
                    </div>
                </Tilt>{' '}
            </div>
        );
    }
}

export default Logo;
