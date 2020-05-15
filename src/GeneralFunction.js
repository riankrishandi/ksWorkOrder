import {
    Alert,
    PermissionsAndroid,
    ToastAndroid
} from 'react-native';

export async function requestLocationPermission(navigation, inOut) {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the ACCESS_FINE_LOCATION.');
            navigation.navigate("CheckInOut", {
                inOut: inOut
            });
        } else {
            console.log("Denied.");
            alert("You must allow KsCheckIn to access this device's location to check in.")
        }
    } catch (error) {
        console.warn(error);
    }
}

export const showAlertOk = (title, message) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: 'Ok'
            }
        ],
        { cancelable: true }
    );
}

export const showToast = (message) => {
    ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
};