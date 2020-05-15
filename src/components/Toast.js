import { ToastAndroid } from 'react-native';

const Toast = (props) => {
    let message = props.message;
    if (message) {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        return null;
    }
    return null;
};

export default Toast;