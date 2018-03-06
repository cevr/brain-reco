import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../components/Logo/logo';
import Rank from '../components/Rank/rank';
import ImageLinkForm from '../components/imageLinkForm/imageLinkForm';
import FaceRecognition from '../components/FaceRecognition/faceRecognition';
import {
    updateEntryCount,
    getFacialRecognitionData
} from '../redux/asyncActions';

class HomePage extends Component {
    state = {
        input: '',
        imgeURL: '',
        box: {}
    };

    componentWillUnmount() {
        this.setState({
            input: '',
            imgeURL: '',
            box: {}
        });
    }

    onInputChange = event => {
        this.setState({
            input: event.target.value
        });
    };

    onImageSubmit = () => {
        const { input } = this.state;
        this.props.getBox(input);
        this.setState({ imageURL: input });
        this.props.updateEntryCount(this.props.id);
    };

    render() {
        const { imageURL } = this.state;
        const { name, entryCount, box } = this.props;
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
    const { id, entryCount, name, box } = state.reducer;
    return {
        id,
        entryCount,
        name,
        box
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateEntryCount: id => {
            dispatch(updateEntryCount(id));
        },
        getBox: input => {
            dispatch(getFacialRecognitionData(input));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
