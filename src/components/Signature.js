import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

class Signature extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { handleGetSignature, handleRemoveSignature, signature } = this.props;

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'flex-start', flex: 1 }}>
                        <View style={[
                            styles.viewSignature,
                            signature == undefined || signature == null ? { backgroundColor: '#f2f2f2' } : { backgroundColor: 'white' }
                        ]}>
                            {
                                signature == undefined || signature == null ?
                                    <Text style={{ color: 'grey' }}>Empty</Text> :
                                    <Image
                                        resizeMode={"contain"}
                                        source={{ uri: signature }}
                                        style={styles.image}
                                    />
                            }
                        </View>
                    </View>
                    <View style={styles.viewButton}>
                        <TouchableOpacity onPress={() => handleGetSignature()} style={styles.buttonLeft}>
                            <Image
                                source={require('../../assets/icon-signature.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={signature == undefined ? true : false}
                            onPress={() => handleRemoveSignature()}
                            style={styles.buttonRight}
                        >
                            <Image
                                source={require('../../assets/icon-delete.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonLeft: {
        alignSelf: 'center',
        backgroundColor: 'lightgrey',
        borderBottomLeftRadius: 5,
        borderColor: '#a6a6a6',
        borderTopLeftRadius: 5,
        borderRightWidth: 0.5,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    buttonRight: {
        alignSelf: 'center',
        backgroundColor: 'lightgrey',
        borderBottomRightRadius: 5,
        borderColor: '#a6a6a6',
        borderTopRightRadius: 5,
        borderLeftWidth: 0.5,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    container: {
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        padding: 15
    },
    icon: {
        height: 25,
        width: 25
    },
    image: {
        borderRadius: 5,
        height: 100,
        width: 100
    },
    viewButton: {
        flex: 1,
        flexDirection: 'row',
    },
    viewSignature: {
        alignItems: 'center',
        borderRadius: 5,
        // borderWidth: 1,
        // flex: 1,
        height: 100,
        justifyContent: 'center',
        width: 100
    }
});

export default Signature;