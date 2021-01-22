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
import { showAlertOk, showToast } from '../GeneralFunction';

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
            let title = "Warning";
            let message = "Username or password cannot be blank."

            showAlertOk(title, message);
        } else {
            dispatch(doLogin(username, password))
                .then(res => {
                    if (res) {
                        showToast(res);
                    }
                });
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
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 15,        
        width: 300
    },
    container: {
        alignItems: "center",
        flex: 1,
        fontWeight: '500',
        justifyContent: "center"
    },
    imageLogo: {
        height: 120,
        width: 120
    },
    textInput: {
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        marginVertical: 10,
        paddingHorizontal: 16,
        width: 300
    },
    textLogin: {
        fontSize: 16,
        textAlign: 'center'
    },
    textLogo: {
        fontSize: 18,
        marginVertical: 10
    },
    textSignUp: {
        color: 'rgb(0,0,255)',
        fontSize: 16
    },
    textSignUpLabel: {
        fontSize: 16
    },
    viewLogo: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "flex-end"
    },
    viewInput: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: "center"
    },
    viewSignUp: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'center',
        marginVertical: 16
    }
});

export default connect()(Login);