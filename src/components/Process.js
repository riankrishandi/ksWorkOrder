import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { requestLocationPermission } from '../GeneralFunction';

class Process extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    handleCheckInOut = (inOut) => {
        const { navigation } = this.props;
        requestLocationPermission(navigation, inOut);
    }

    render() {
        const { process, timeIn, timeOut } = this.props;
        const { width } = this.state;

        return (
            <View style={[
                styles.container,
                { width: width - 60 }
            ]}>
                <View style={styles.viewCheckIn}>
                    <View style={styles.viewLabel}>
                        <View style={styles.viewIcon}>
                            <Image
                                style={styles.icon}
                                source={require('../../assets/icon-check-in.png')}
                            />
                        </View>
                        <Text style={styles.textLabel}>Check In</Text>
                    </View>
                    <View style={styles.viewInformation}>
                        {
                            process == -1 ?
                                <Text style={[styles.textInformation, { color: '#666666', textAlign: 'center' }]}>
                                    Not Available
                                </Text> : process == 0 ?
                                    <TouchableOpacity style={styles.buttonStart} onPress={() => this.handleCheckInOut(0)}>
                                        <Text style={styles.textButtonStart}>Start</Text>
                                    </TouchableOpacity> :
                                    <View style={styles.viewTime}>
                                        <View style={styles.viewIcon}>
                                            <Image
                                                style={styles.icon}
                                                source={require('../../assets/icon-time.png')}
                                            />
                                        </View>
                                        <Text style={styles.textInformation}>{timeIn.substr(0, 5)}</Text>
                                    </View>
                        }
                    </View>
                </View>
                <View style={styles.viewCheckOut}>
                    <View style={styles.viewLabel}>
                        <View style={styles.viewIcon}>
                            <Image
                                style={styles.icon}
                                source={require('../../assets/icon-check-out.png')}
                            />
                        </View>
                        <Text style={styles.textLabel}>Check Out</Text>
                    </View>
                    <View style={styles.viewInformation}>
                        {
                            process == -2 || process == -1 || process == 0 ?
                                <Text style={[styles.textInformation, { color: '#666666', textAlign: 'center' }]}>
                                    Not Available
                                </Text> : process == 1 ?
                                    <TouchableOpacity style={styles.buttonFinish} onPress={() => this.handleCheckInOut(1)}>
                                        <Text style={styles.textButtonFinish}>Finish</Text>
                                    </TouchableOpacity> :
                                    <View style={{ flexDirection: "row", justifyContent: 'center', width: '60%' }}>
                                        <View style={styles.viewIcon}>
                                            <Image
                                                style={styles.icon}
                                                source={require('../../assets/icon-time.png')}
                                            />
                                        </View>
                                        <Text style={styles.textInformation}>{timeOut.substr(0, 5)}</Text>
                                    </View>
                        }
                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    buttonFinish: {
        backgroundColor: '#004de6',
        borderRadius: 5,
        paddingVertical: 5,
        width: '60%'
    },
    buttonStart: {
        backgroundColor: '#ffcc00',
        borderRadius: 5,
        paddingVertical: 5,
        width: '60%'
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        // borderWidth: 1,
        paddingHorizontal: 10
    },
    icon: {
        height: 25,
        tintColor: '#666666',
        width: 25
    },
    textButtonFinish: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    textButtonStart: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    textInformation: {
        alignSelf: 'center',
        color: '#666666',
        fontSize: 15,
        paddingVertical: 5
    },
    textLabel: {
        alignSelf: 'center',
        color: '#666666',
        flex: 1,
        fontSize: 15,
        marginLeft: 10
    },
    viewCheckIn: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    viewCheckOut: {
        borderColor: '#e6e6e6',
        borderTopWidth: 1,
        flexDirection: 'row',
        paddingVertical: 15
    },
    viewIcon: {
        justifyContent: 'center'
    },
    viewInformation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    viewLabel: {
        flex: 1,
        flexDirection: 'row'
    },
    viewTime: {
        flexDirection: "row",
        justifyContent: 'center',
        width: '60%'
    }
});

export default Process;