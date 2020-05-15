import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Signature from 'react-native-signature-canvas';

export default class SignatureScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSignature = signature => {
        const { navigate } = this.props.navigation;
        navigate('CheckInOut', {
            signature: signature,
        });
    };

    handleEmpty = () => {
        console.log('Empty');
        alert('Signature is blank. Please sign again.');
    }

    render() {

        const style = '.m-signature-pad--body canvas { border: 1px solid black } .m-signature-pad--footer { bottom: 10px; display: flex; height: 40px; flex: 1; justify-content: flex-end } .m-signature-pad--footer .button { background-color: #d3d3d3; color: black; font-size: 15px; height: 40px; margin-left: 8px; position: static; width: 30% } .description { display: none } '

        return (
            <View style={styles.container}>
                <View style={{ height: 400, width: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <Signature
                            onOK={this.handleSignature}
                            onEmpty={this.handleEmpty}
                            descriptionText="Signature"
                            clearText="Clear"
                            confirmText="Save"
                            webStyle={style}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        // alignItems: "center",
        // alignSelf: "center",
        height: "100%",
        justifyContent: "center",
        width: "100%"
    }
});