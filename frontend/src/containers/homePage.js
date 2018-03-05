import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../components/Logo/logo';
import Rank from '../components/Rank/rank';
import ImageLinkForm from '../components/imageLinkForm/imageLinkForm';
import FaceRecognition from '../components/FaceRecognition/faceRecognition';
import Clarifai from 'clarifai';
import { updateEntryCount } from '../redux/asyncActions';

const faceRecognitionAPI = new Clarifai.App({
    apiKey: 'f6dbeec361614947b1439e42dee8f722'
});
class HomePage extends Component {
    state = {
        input: '',
        imgeURL: '',
        box: {}
    };

    calculateFaceLocation = data => {
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

    displayBox = box => {
        this.setState({ box });
    };
    onInputChange = event => {
        this.setState({
            input: event.target.value
        });
    };

    onImageSubmit = () => {
        const { input } = this.state;
        this.setState({ imageURL: input });
        faceRecognitionAPI.models
            .predict(Clarifai.FACE_DETECT_MODEL, input)
            .then(response => {
                this.displayBox(this.calculateFaceLocation(response));
                this.props.updateEntryCount(this.props.id);
            })
            .catch(err => console.log(err));
    };

    render() {
        const { imageURL, box } = this.state;
        const { name, entryCount } = this.props;
        return (
            <div>
                <Logo />
                <Rank name={name} count={entryCount} />
                <ImageLinkForm
                    onSubmit={this.onImageSubmit}
                    onInputChange={this.onInputChange}
                />
                <FaceRecognition box={box} imageURL={imageURL} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { id, entryCount, name, error } = state.reducer;
    return {
        id,
        entryCount,
        name,
        error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEntryCount: id => {
            dispatch(updateEntryCount(id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
