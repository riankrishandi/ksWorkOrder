import React from 'react';
import {
    Image,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';

import { doLogin } from '../actions/login/loginFunctions';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleLogin = () => {
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username == '' || password == '') {
            alert("Username or password cannot be blank.");
        } else {
            dispatch(doLogin(username, password));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewLogo}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../../assets/logo-ks.jpg')}
                    />
                    <Text style={styles.textLogo}>Krishand Work Order</Text>
                </View>
                <View style={styles.viewInput}>
                    <TextInput
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder="Username"
                        style={styles.textInput}
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder="Password"
                        style={styles.textInput}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.buttonLogin}
                        onPress={
                            () => this.handleLogin()
                        }
                    >
                        <Text style={styles.textLogin}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewSignUp}>
                    <Text style={styles.textSignUpLabel}>Don't have an account yet? </Text>
                    <TouchableOpacity>
                        <Text style={styles.textSignUp}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    buttonLogin: {
        borderRadius: 10,
        backgroundColor: '#1c313a',
        width: 300,
        paddingVertical: 15,
        marginVertical: 10,
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        fontWeight: '500',
    },
    imageLogo: {
        width: 120,
        height: 120,
    },
    textInput: {
        width: 300,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginVertical: 10,
        fontSize: 16,
    },
    textLogin: {
        fontSize: 16,
        textAlign: 'center',
        color: '#ffffff',
    },
    textLogo: {
        marginVertical: 10,
        fontSize: 18,
    },
    textSignUp: {
        fontSize: 16,
        color: 'rgb(0,0,255)',
    },
    textSignUpLabel: {
        fontSize: 16,
    },
    viewLogo: {
        alignItems: "center",
        justifyContent: "flex-end",
        flexGrow: 1,
    },
    viewInput: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    viewSignUp: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginVertical: 16,
        flexDirection: 'row',
    }
});

export default connect()(Login);