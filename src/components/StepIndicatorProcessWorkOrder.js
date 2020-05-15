import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const labels = ["Check In","Check Out", "Lock"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#1c313a',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#1c313a',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#1c313a',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#1c313a',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#1c313a',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#1c313a'
}

class StepIndicatorProcessWorkOrder extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { currentPosition } = this.props;

        return (
            <View style={styles.container}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    labels={labels}
                    stepCount={3}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
        // height: "100%",
        // width: "100%",
    },
    // viewIndicator: {
    //     borderBottomWidth: 1,
    //     flex: 1,
    //     justifyContent: "center",
    // },
    // viewMain: {
    //     // borderWidth: 1,
    //     alignItems: 'center',
    //     flex: 3,
    //     justifyContent: "center",
    // },
});

export default StepIndicatorProcessWorkOrder;