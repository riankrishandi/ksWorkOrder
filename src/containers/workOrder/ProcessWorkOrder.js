import React from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';

import TabViewWorkOrder from '../../components/TabViewWorkOrder';
import { getProcessWorkOrder, setSyncProcessWorkOrderComments, cancelWorkOrder, finalizeWorkOrder } from '../../actions/processWorkOrder/processWorkOrderFunctions';
import Loading from '../../Loading';
import Process from '../../components/Process';

import {showToast} from '../../GeneralFunction';

class ProcessWorkOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            tempComments: null
        };
    }

    _onRefresh = () => {
        const { workOrder } = this.props;
        this.setState({ refreshing: true });
        this.getWorkOrder(workOrder);
        this.setState({ refreshing: false });
    }

    componentDidMount = () => {
        const { route } = this.props;
        var workOrder = route.params?.workOrder;
        this.getWorkOrder(workOrder);
    }

    componentWillUnmount = () => {
        const { workOrder } = this.props;
        const { tempComments } = this.state;
        console.log(tempComments);
        if (tempComments !== null) {
            setSyncProcessWorkOrderComments(workOrder.id_work_order, tempComments);
        }
    }

    getWorkOrder = (workOrder) => {
        const { dispatch, navigation, idEmployee } = this.props;
        dispatch(getProcessWorkOrder(workOrder, navigation, idEmployee))
            .then(err => {
                if (err) {
                    showToast("Network error.");
                }
            });
    }

    handleCancelWorkOrder = () => {
        const { dispatch, workOrder, idEmployee } = this.props;
        dispatch(cancelWorkOrder(workOrder.id_work_order, idEmployee));
    }

    confirmCancelWorkOrder = () => {
        Alert.alert(
            'Warning',
            'Are you sure to cancel?',
            [
                {
                    text: 'Ok',
                    onPress: () => this.handleCancelWorkOrder()
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
            ],
            { cancelable: true }
        );
    }

    handleFinalizeWorkOrder = () => {
        const { dispatch, workOrder, idEmployee } = this.props;
        const { tempComments } = this.state;
        var comments = tempComments == null ? workOrder.work_order_comments : tempComments;
        dispatch(finalizeWorkOrder(
            comments,
            workOrder.id_work_order,
            idEmployee
        ));
    }

    confirmFinalizeWorkOrder = () => {
        Alert.alert(
            'Confirm',
            'Are you sure to finalize?',
            [
                {
                    text: 'Ok',
                    onPress: () => this.handleFinalizeWorkOrder()
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
            ],
            { cancelable: true }
        );
    }

    // showToast = (message) => {
    //     ToastAndroid.showWithGravity(
    //         message,
    //         ToastAndroid.SHORT,
    //         ToastAndroid.CENTER
    //     );
    // };

    render() {
        const { error, loading, navigation, workOrder } = this.props;
        const { refreshing, tempComments } = this.state;

        if (loading) {
            return <Loading />;
        }

        return (
            <View style={{ width: '100%', height: '100%' }}>
                {
                    workOrder.finalized == 1 && <View style={[styles.viewAnnouncement, { backgroundColor: '#1c313a' }]}>
                        <Text style={styles.textAnnouncement}>Finalized.</Text>
                    </View>
                }
                {
                    workOrder.finalized == 0 && workOrder.cancelled == 1 && <View
                        style={[styles.viewAnnouncement, { backgroundColor: '#e60000' }
                        ]}>
                        <Text style={styles.textAnnouncement}>Cancelled.</Text>
                    </View>
                }
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
                        <View style={[
                            styles.viewProcess,
                            workOrder.finalized == 0 && workOrder.cancelled == 0 ? { marginTop: 15 } : { marginTop: 5 }
                        ]}>
                            <Text style={styles.textTitle}>Process</Text>
                            <Process
                                process={
                                    workOrder.cancelled == 1 && workOrder.time_out != null ?
                                        -3 : workOrder.cancelled == 1 && workOrder.time_in != null ?
                                            -2 : workOrder.cancelled == 1 ?
                                                -1 : workOrder.time_in == null ?
                                                    0 : workOrder.time_out == null ?
                                                        1 : 2
                                }
                                timeIn={workOrder.time_in}
                                timeOut={workOrder.time_out}
                                navigation={navigation}
                            />
                        </View>
                        <View style={styles.viewInformation}>
                            <Text style={styles.textTitle}>Information</Text>
                            <View style={styles.tabView}>
                                <TabViewWorkOrder workOrder={workOrder} />
                            </View>
                        </View>
                        <View style={styles.viewComments}>
                            <Text style={styles.textTitle}>Comments</Text>
                            {
                                workOrder.finalized == 0 && <TextInput
                                    multiline={true}
                                    onChangeText={(comments) => this.setState({ tempComments: comments })}
                                    placeholder='Type your comments here.'
                                    style={styles.textInput}
                                    underlineColorAndroid='#b3b3b3'
                                    value={tempComments == null ? workOrder.work_order_comments : tempComments}
                                />
                            }
                            {
                                workOrder.finalized == 1 && <Text style={styles.textComments}>
                                    {workOrder.work_order_comments}
                                </Text>
                            }
                        </View>
                        {
                            workOrder.finalized == 0 && <TouchableOpacity
                                disabled={workOrder.time_out != null || workOrder.cancelled == 1 ? false : true}
                                onPress={() => this.confirmFinalizeWorkOrder()}
                                style={[
                                    styles.buttonFinalize,
                                    workOrder.time_out != null || workOrder.cancelled == 1 ? {
                                        opacity: 1
                                    } : {
                                            opacity: 0.5
                                        }
                                ]}
                            >
                                <Text style={styles.textButtonFinalize}>Finalize</Text>
                            </TouchableOpacity>
                        }
                        {
                            workOrder.finalized == 0 && workOrder.cancelled == 0 && <TouchableOpacity onPress={() => this.confirmCancelWorkOrder()} style={styles.buttonCancel}>
                                <Text style={styles.textButtonCancel}>Cancel</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonCancel: {
        backgroundColor: '#e60000',
        borderRadius: 5,
        flex: 1,
        marginTop: 10,
        paddingVertical: 10,
        width: '100%'
    },
    buttonCheckIn: {
        backgroundColor: '#1c313a',
        borderRadius: 10,
        paddingVertical: 10,
        width: 300
    },
    buttonCheckOut: {
        backgroundColor: '#1c313a',
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 10,
        width: 300
    },
    buttonFinalize: {
        backgroundColor: '#1c313a',
        borderRadius: 5,
        flex: 1,
        marginTop: 40,
        paddingVertical: 10,
        width: '100%'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    container: {
        backgroundColor: '#e6e6e6',
        height: "100%",
        paddingHorizontal: 30,
        paddingBottom: 15,
        width: "100%"
    },
    tabView: {
        width: "100%"
    },
    textAnnouncement: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    textButtonCancel: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    textButtonFinalize: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    textComments: {
        color: '#666666',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        width: '100%'
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 3,
        width: '100%'
    },
    textTitle: {
        color: 'grey',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5
    },
    viewAnnouncement: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        width: '100%'
    },
    viewInformation: {
        marginTop: 30
    },
    viewComments: {
        marginTop: 30
    },
    viewProcess: {

    },
    viewStatus: {
        marginTop: 20
    }
});

const mapStateToProps = state => ({
    error: state.processWorkOrder.error,
    idEmployee: state.login.idEmployee,
    loading: state.processWorkOrder.loading,
    workOrder: state.processWorkOrder.workOrder
});

export default connect(mapStateToProps)(ProcessWorkOrder);