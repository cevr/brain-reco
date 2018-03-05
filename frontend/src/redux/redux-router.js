import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';

export default connect(state => ({
    location: state.router.location
}))(Switch);
