import React, { Component } from 'react';

class ImageLinkForm extends Component {
    render() {
        return (
            <div>
                <p className="f3 white">
                    {`This will detect faces in your pictures. Give it a try`}
                </p>
                <div className="flex justify-center">
                    <div
                        style={{
                            width: '35vw'
                        }}
                    >
                        <input
                            onChange={this.props.onInputChange}
                            className="f4 pa2 w-60 center shadow-1 br1 br--right0"
                            type="text"
                            style={{ border: 'none' }}
                        />
                        <button
                            onClick={this.props.onSubmit}
                            className="w-20 grow f4 link ph3 pv2 dib black bg-white shadow-1 ml1 br--left br1"
                            style={{ border: 'none', minWidth: '90px' }}
                        >
                            Detect
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageLinkForm;
