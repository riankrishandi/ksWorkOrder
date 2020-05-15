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
            navigation.navigate("CheckInOut", {
                inOut: inOut
            });
        } else {
            let title = "Warning";
            let message = "Location access is denied.";

            showAlertOk(title, message);
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

export const showAlertOkCancel = (title, message, onPressOk) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: 'Ok',
                onPress: () => onPressOk()
            },
            {
                text: 'Cancel',
                style: 'cancel'
            },
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