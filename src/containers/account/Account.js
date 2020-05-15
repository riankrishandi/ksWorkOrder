import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';

import { doLogout } from '../../actions/login/loginFunctions';

class Account extends React.Component {

    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(doLogout());
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1c313a',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        width: 300
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    container: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: "100%",
        justifyContent: "center",
        width: "100%"
    }
});

export default connect()(Account);