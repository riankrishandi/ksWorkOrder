import React from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';

import Loading from '../../Loading';
import Attendance from '../../components/Attendance';
import TabViewWorkOrder from '../../components/TabViewWorkOrder';

import {
    getProcessWorkOrder,
    setProcessWorkOrderTempReport,
    cancelWorkOrder,
    finalizeWorkOrder
} from '../../actions/processWorkOrder/processWorkOrderFunctions';
import { showAlertOkCancel, showToast } from '../../GeneralFunction';

class ProcessWorkOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            tempReport: null
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

        let workOrder = route.params?.workOrder;

        this.getWorkOrder(workOrder);
    }

    componentWillUnmount = () => {
        const { workOrder } = this.props;
        const { tempReport } = this.state;

        let finalized = workOrder.finalized;
        let idWorkOrder = workOrder.id_work_order;

        if (finalized == 0 && tempReport != null) {
            setProcessWorkOrderTempReport(idWorkOrder, tempReport);
        }
    }

    getWorkOrder = (workOrder) => {
        const { dispatch, navigation, idEmployee } = this.props;

        dispatch(getProcessWorkOrder(workOrder, navigation, idEmployee))
            .then(message => {
                if (message) {
                    showToast(message);
                }
            });
    }

    handleCancelWorkOrder = () => {
        const { dispatch, workOrder, idEmployee } = this.props;

        dispatch(cancelWorkOrder(workOrder.id_work_order, idEmployee))
            .then(message => {
                if (message) {
                    showToast(message);
                }
            });
    }

    confirmCancelWorkOrder = () => {
        let title = "Warning";
        let message = "Are you sure to cancel?";

        showAlertOkCancel(title, message, this.handleCancelWorkOrder);
    }

    handleFinalizeWorkOrder = () => {
        const { dispatch, workOrder, idEmployee } = this.props;
        const { tempReport } = this.state;

        let report = tempReport == null ? workOrder.report : tempReport;
        let idWorkOrder = workOrder.id_work_order;

        dispatch(finalizeWorkOrder(report, idWorkOrder, idEmployee))
            .then(message => {
                if (message) {
                    showToast(message);
                }
            });
    }

    confirmFinalizeWorkOrder = () => {
        let title = "Warning";
        let message = "Are you sure to finalize?";

        showAlertOkCancel(title, message);
    }

    render() {
        const { loading, navigation, workOrder } = this.props;
        const { refreshing, tempReport } = this.state;

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
                        {/* <View style={styles.viewHeader}>
                            <Text></Text>
                        </View> */}
                        <View style={[
                            styles.viewAttendance,
                            workOrder.finalized == 0 && workOrder.cancelled == 0 ? { marginTop: 15 } : { marginTop: 5 }
                        ]}>
                            
                            <Text style={styles.textTitle}>Attendance</Text>
                            <Attendance
                                state={
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
                        <View style={styles.viewReports}>
                            <Text style={styles.textTitle}>Report</Text>
                            {
                                workOrder.finalized == 0 && <TextInput
                                    multiline={true}
                                    onChangeText={(report) => this.setState({ tempReport: report })}
                                    placeholder='Type your report here.'
                                    style={styles.textInput}
                                    underlineColorAndroid='#b3b3b3'
                                    value={tempReport == null ? workOrder.report : tempReport}
                                />
                            }
                            {
                                workOrder.finalized == 1 && <Text style={styles.textReports}>
                                    {workOrder.report}
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
    textReports: {
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
    viewHeader: {
        backgroundColor: 'white',
        padding: 10,
        width: '100%'
    },
    viewInformation: {
        marginTop: 30
    },
    viewReports: {
        marginTop: 30
    },
    viewAttendance: {

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