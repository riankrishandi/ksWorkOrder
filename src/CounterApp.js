import React from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import RootNavigator from './Router';
import { getLogin } from './actions/login/loginFunctions';
import Loading from './Loading';

class CounterApp extends React.Component {

    componentDidMount =  () => {
        const { dispatch } = this.props;
        dispatch((getLogin()));
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