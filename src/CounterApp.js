import React from 'react';
import { connect } from 'react-redux';

import RootNavigator from './Router';
import { getLogin } from './actions/login/loginFunctions';
import Loading from './Loading';
import {showToast} from './GeneralFunction';

class CounterApp extends React.Component {

    componentDidMount = () => {
        const { dispatch } = this.props;

        dispatch(getLogin())
            .then(message => {
                if (message) {
                    showToast(message);
                }
            });
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return <Loading />;
        }

        return <RootNavigator />;
    }
}

const mapStateToProps = state => ({
    loading: state.login.loading
});

export default connect(mapStateToProps)(CounterApp);