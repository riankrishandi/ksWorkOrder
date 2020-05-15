'use strict';

import React from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { error } from '../../actions/login/loginActions';

class GetLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            location => {
                console.log(JSON.stringify(location));

                let currentLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }

                this.setState({ currentLocation });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        );
    }

    handleConfirmLocation = () => {
        const { navigate } = this.props.navigation;
        const { currentLocation } = this.state;
        navigate('ProcessWorkOrder', {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
        });
    }

    render() {

        const { currentLocation } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.viewMap}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        style={styles.map}
                        initialRegion={currentLocation}
                    />
                </View>
                <View style={styles.viewConfirm}>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleConfirmLocation()}>
                        <Text style={styles.buttonText}>Confirm Location</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1c313a',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        width: 200
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center'
    },
    container: {
        height: "100%",
        width: "100%"
    },
    map: {
        height: "100%",
        width: "100%"
    },
    viewConfirm: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    viewMap: {
        borderWidth: 1,
        flex: 5,
        marginHorizontal: 10,
        marginTop: 10
    }
});

export default GetLocation;