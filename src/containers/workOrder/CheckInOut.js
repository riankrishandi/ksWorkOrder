import * as React from 'react';
import {
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { doCheckIn, doCheckOut } from '../../actions/processWorkOrder/processWorkOrderFunctions';
import Photo from '../../components/Photo';
import Signature from '../../components/Signature';

var moment = require('moment');

class CheckInOut extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(),
            description: '',
            getLocation: false,
            photoDataBase64: null,
            refreshing: false
        };
    }

    _onRefresh = async () => {
        this.handleGetCurrentPosition();
    }

    componentDidMount = () => {
        const { route, navigation } = this.props;
        var inOut = route.params?.inOut;
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        backgroundColor: inOut == 0 ? '#ffcc00' : '#004de6',
                        borderRadius: 5,
                        marginRight: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                    }}
                    onPress={() => {
                        if (inOut == 0) {
                            this.handleDoCheckIn();
                        } else {
                            this.handleDoCheckOut();
                        }
                    }}
                >
                    <Text style={{
                        color: inOut == 0 ? 'black' : 'white'
                    }}>
                        Done
                    </Text>
                </TouchableOpacity>
            )
        });
        this.handleGetCurrentPosition();
    }

    handleGetCurrentPosition = () => {
        this.setState({ refreshing: true });
        Geolocation.getCurrentPosition(
            location => {
                let currentLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0015,
                    longitudeDelta: 0.0015
                }

                this.setState({ currentLocation, getLocation: true, refreshing: false });
            },
            error => {
                alert(error.message)
                this.setState({ getLocation: false, refreshing: false });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        );
    }

    handleTakePhoto = (photoDataBase64) => {
        this.setState({ photoDataBase64 });
    }

    handleRemovePhoto = () => {
        this.setState({
            photoDataBase64: null
        })
    }

    handleGetSignature = () => {
        const { navigate } = this.props.navigation;
        navigate("GetSignature");
    }

    handleRemoveSignature = () => {
        const { navigation } = this.props;
        navigation.setParams({
            signature: null
        });
    }

    handleDoCheckIn = () => {
        const { dispatch, workOrder, navigation, idEmployee } = this.props;
        const { currentTime, getLocation, currentLocation, photoDataBase64, description } = this.state;
        if (!currentTime) {
            alert("Time is blank.");
        } else if (!getLocation) {
            alert("Location is blank.");
        } else if (!photoDataBase64) {
            alert("Photo is blank.");
        } else if (!description) {
            alert("Description is blank.");
        } else {
            dispatch(doCheckIn(
                workOrder.id_work_order,
                currentTime,
                currentLocation.latitude,
                currentLocation.longitude,
                photoDataBase64,
                description,
                navigation,
                idEmployee
            ));
        }
    }

    handleDoCheckOut = () => {
        const { dispatch, idEmployee, navigation, route, workOrder } = this.props;
        const { currentTime, getLocation, currentLocation, photoDataBase64, description } = this.state;

        var signature = route.params?.signature;

        if (!currentTime) {
            alert("Time is blank.");
        } else if (!getLocation) {
            alert("Location is blank.");
        } else if (!photoDataBase64) {
            alert("Photo is blank.");
        } else if (!signature) {
            alert("Signature is blank.")
        } else if (!description) {
            alert("Description is blank.");
        } else {
            dispatch(doCheckOut(
                workOrder.id_work_order,
                currentTime,
                currentLocation.latitude,
                currentLocation.longitude,
                photoDataBase64,
                signature,
                description,
                navigation,
                idEmployee
            ));
        }
    }

    render() {
        const { route } = this.props;
        var inOut = route.params?.inOut;
        var signature = route.params?.signature;

        const {
            currentLocation,
            currentTime,
            photoDataBase64,
            refreshing
        } = this.state;

        return (
            <ScrollView
                keyboardShouldPersistTaps='handled'
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                <View style={styles.container}>
                    <View style={styles.viewTime}>
                        <Image
                            style={styles.iconTime}
                            source={require('../../../assets/icon-time.png')}
                        />
                        <Text style={styles.textLabel}>Current Time</Text>
                        <Text style={styles.textInformation}>{moment(currentTime).format('HH:mm')}</Text>
                    </View>

                    <View style={styles.viewLocation}>
                        <Text style={styles.textTitle}>Current Location</Text>
                        <View style={styles.viewMap}>
                            <MapView
                                region={currentLocation}
                                loadingEnabled={true}
                                pitchEnabled={false}
                                provider={PROVIDER_GOOGLE}
                                scrollEnabled={false}
                                showsUserLocation={true}
                                style={styles.map}
                                zoomEnabled={false}
                                zoomTapEnabled={false}
                            />
                        </View>
                    </View>
                    <View style={styles.viewPhoto}>
                        <Text style={styles.textTitle}>Photo</Text>
                        <Photo
                            handleRemovePhoto={this.handleRemovePhoto}
                            handleTakePhoto={this.handleTakePhoto}
                            photoDataBase64={photoDataBase64}
                        />
                    </View>
                    {
                        inOut == 1 && <View style={styles.viewSignature}>
                            <Text style={styles.textTitle}>Client's Signature</Text>
                            <Signature
                                handleGetSignature={this.handleGetSignature}
                                handleRemoveSignature={this.handleRemoveSignature}
                                signature={signature}
                            />
                        </View>
                    }
                    <View style={styles.viewDescription}>
                        <Text style={styles.textTitle}>Description</Text>
                        <TextInput
                            editable={true}
                            multiline={true}
                            onChangeText={(description) => this.setState({ description: description })}
                            placeholder='Type here.'
                            style={styles.textInput}
                            underlineColorAndroid='#b3b3b3'
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1c313a',
        borderRadius: 5,
        borderWidth: 1,
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    container: {
        backgroundColor: '#e6e6e6',
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 30,
        width: "100%"
    },
    iconTime: {
        height: 25,
        marginRight: 5,
        width: 25
    },
    iconSignature: {
        height: 100,
        width: 100
    },
    map: {
        height: "100%",
        width: "100%"
    },
    signature: {
        height: 140,
        width: '100%'
    },
    textButton: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    textButtonMap: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center'
    },
    textInformation: {
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        textAlignVertical: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 3,
        width: '100%'
    },
    textLabel: {
        fontSize: 15,
        flex: 1,
        textAlignVertical: 'center'
    },
    textTitle: {
        color: 'grey',
        fontSize: 18,
        marginBottom: 5
    },
    viewDescription: {
        marginTop: 30
    },
    viewMap: {
        height: 280,
        width: '100%',
    },
    viewLocation: {
        marginTop: 30
    },
    viewPhoto: {
        marginTop: 30
    },
    viewSignature: {
        marginTop: 30
    },
    viewSignatureButton: {
        flexDirection: 'row',
        marginTop: 5,
    },
    viewSignatureImage: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        height: 140,
        justifyContent: 'center',
        width: '100%'
    },
    viewTime: {
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});

const mapStateToProps = state => ({
    idEmployee: state.login.idEmployee,
    workOrder: state.processWorkOrder.workOrder
});

export default connect(mapStateToProps)(CheckInOut);