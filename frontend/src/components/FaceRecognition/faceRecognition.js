import React, { Component } from 'react';
import './faceRecognition.css';

class FaceRecognition extends Component {
    render() {
        const { imageURL, box } = this.props;
        return (
            <div className="flex justify-center ma3">
                <div className="absolute ">
                    {' '}
                    <img
                        id="inputImage"
                        className="shadow-5 br3 white"
                        alt="Recognized Face(s)"
                        src={imageURL}
                        style={{
                            maxWidth: '25vw',
                            maxHeight: 'auto'
                        }}
                    />
                    <div
                        className="bounding-box"
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default FaceRecognition;
