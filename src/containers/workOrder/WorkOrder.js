import React from 'react';
import {
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import DateTimePicker from '@react-native-community/datetimepicker';

import Loading from '../../Loading';
import ScrollViewWorkOrder from '../../components/ScrollViewWorkOrder';
import WorkOrderItem from '../../components/WorkOrderItem';

import { getLogin } from '../../actions/login/loginFunctions';
import { getAndFilterWorkOrders } from '../../actions/workOrder/workOrderFunctions';
import { showToast } from '../../GeneralFunction';

var moment = require('moment');

class WorkOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            displayedDate: new Date(),
            showDatePicker: false,
        };
    };

    componentDidMount() {
        const { idEmployee } = this.props;

        if (idEmployee !== '') {
            this.getWorkOrders();
        }
    };

    handleDisplayedDate = (displayedDate) => {
        var dateToday = new Date();
        var dateYesterday = new Date(dateToday);
        var dateTomorrow = new Date(dateToday);

        dateYesterday.setDate(dateYesterday.getDate() - 1);
        dateTomorrow.setDate(dateTomorrow.getDate() + 1);

        if (moment(displayedDate).isSame(dateToday, 'day'))
            return 'Today';
        else if (moment(displayedDate).isSame(dateYesterday, 'day'))
            return 'Yesterday';
        else if (moment(displayedDate).isSame(dateTomorrow, 'day'))
            return 'Tomorrow';
        else
            return moment(displayedDate).format('ddd, MMM DD');
    };

    handleDateNext = () => {
        const { displayedDate } = this.state;

        displayedDate.setDate(displayedDate.getDate() + 1);

        this.setState({ displayedDate });

        this.getWorkOrders();
    };

    handleDateBefore = () => {
        const { displayedDate } = this.state;

        displayedDate.setDate(displayedDate.getDate() - 1);

        this.setState({ displayedDate });

        this.getWorkOrders();
    };

    handleDatePicker = () => {
        this.setState({ showDatePicker: true });
    };

    setDatePicked = (event, datePicked) => {
        const { displayedDate } = this.state;
        
        datePicked = datePicked || displayedDate;

        if (moment(datePicked).isSame(displayedDate)) {
            this.setState({ showDatePicker: false });
        } else {
            this.setState({
                showDatePicker: false,
                displayedDate: datePicked
            });

            this.getWorkOrders();
        }
    };

    _onRefresh = () => {
        const { idEmployee, dispatch } = this.props;

        this.setState({ refreshing: true });

        if (idEmployee == '') {
            dispatch(getLogin())
                .then(message => {
                    if (message) {
                        showToast(message);
                    }
                });
        } else {
            this.getWorkOrders();
        }

        this.setState({ refreshing: false });
    };

    getWorkOrders = () => {
        const { dispatch, idEmployee } = this.props;
        const { displayedDate } = this.state;

        dispatch(getAndFilterWorkOrders(idEmployee, displayedDate))
            .then(message => {
                if (message) {
                    showToast(message);
                }
            });
    };

    handleWorkOrder = (workOrder) => {
        const { navigate } = this.props.navigation;

        navigate("ProcessWorkOrder", {
            workOrder: workOrder
        });
    };

    render() {
        const { displayedDate, showDatePicker } = this.state;
        const {
            allWorkOrders,
            cancelledWorkOrders,
            closedWorkOrders,
            finalizedWorkOrders,
            inProgressWorkOrders,
            loading,
            openWorkOrders
        } = this.props;

        if (loading) {
            return <Loading />;
        }

        const refreshControl = <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
        />

        return (
            <View style={styles.container}>
                <View style={styles.viewHeader}>
                    <TouchableOpacity style={styles.buttonIcon} onPress={() => this.handleDateBefore()}>
                        <Image
                            style={styles.icon}
                            source={require('../../../assets/icon-back.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDate} onPress={() => this.handleDatePicker()}>
                        <Text style={styles.textHeader}>{this.handleDisplayedDate(displayedDate)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonIcon} onPress={() => this.handleDateNext()}>
                        <Image
                            style={styles.icon}
                            source={require('../../../assets/icon-next.png')}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarUnderlineStyle={{
                        backgroundColor: 'black'
                    }}
                    tabBarActiveTextColor='black'
                    tabBarBackgroundColor='white'
                    tabBarInactiveTextColor='#666666'
                    showsHorizontalScrollIndicator={false}
                    contentStyle={styles.viewTab}
                >
                    <ScrollViewWorkOrder
                        handleWorkOrder={this.handleWorkOrder}
                        refreshControl={refreshControl}
                        tabLabel="All"
                        workOrders={allWorkOrders}
                    />
                    <ScrollViewWorkOrder
                        handleWorkOrder={this.handleWorkOrder}
                        refreshControl={refreshControl}
                        tabLabel="Open"
                        workOrders={openWorkOrders}
                    />
                    <ScrollViewWorkOrder
                        handleWorkOrder={this.handleWorkOrder}
                        refreshControl={refreshControl}
                        tabLabel="In Progress"
                        workOrders={inProgressWorkOrders}
                    />
                    <ScrollViewWorkOrder
                        handleWorkOrder={this.handleWorkOrder}
                        refreshControl={refreshControl}
                        tabLabel="Closed"
                        workOrders={closedWorkOrders}
                    />
                    <ScrollViewWorkOrder
                        handleWorkOrder={this.handleWorkOrder}
                        refreshControl={refreshControl}
                        tabLabel="Cancelled"
                        workOrders={cancelledWorkOrders}
                    />
                    <ScrollViewWorkOrder
                        handleWorkOrder={this.handleWorkOrder}
                        refreshControl={refreshControl}
                        tabLabel="Finalized"
                        workOrders={finalizedWorkOrders}
                    />
                </ScrollableTabView>
                {
                    showDatePicker && <DateTimePicker
                        value={displayedDate}
                        mode='date'
                        display='calendar'
                        onChange={this.setDatePicked}
                    />
                }
            </View >
        );
    };
}

const styles = StyleSheet.create({
    buttonDate: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    buttonIcon: {
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    container: {
        height: "100%",
        width: "100%"
    },
    icon: {
        height: 25,
        width: 25
    },
    textHeader: {
        fontSize: 18
    },
    viewHeader: {
        backgroundColor: "#e6e6e6",
        flexDirection: "row",
        paddingVertical: 10,
        width: "100%",
    },
    viewTab: {
        backgroundColor: '#e6e6e6',
    }
});

const mapStateToProps = state => ({
    allWorkOrders: state.workOrder.allWorkOrders,
    cancelledWorkOrders: state.workOrder.cancelledWorkOrders,
    closedWorkOrders: state.workOrder.closedWorkOrders,
    finalizedWorkOrders: state.workOrder.finalizedWorkOrders,
    idEmployee: state.login.idEmployee,
    inProgressWorkOrders: state.workOrder.inProgressWorkOrders,
    loading: state.workOrder.loading,
    openWorkOrders: state.workOrder.openWorkOrders,
});

export default connect(mapStateToProps)(WorkOrder);