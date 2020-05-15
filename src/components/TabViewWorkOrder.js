import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

var moment = require('moment');

class TabViewWorkOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            tabFocused: 0
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    handleFocusTab0 = () => {
        this.setState({
            tabFocused: 0
        });
    }

    handleFocusTab1 = () => {
        this.setState({
            tabFocused: 1
        });
    }

    render() {
        const { workOrder } = this.props;
        const { width, tabFocused } = this.state;

        return (
            <View style={[styles.container, { width: width - 60 }]}>
                <View style={styles.viewTabHeader}>
                    <View style={tabFocused == 0 ? styles.viewTabFocused : styles.viewTabTitle}>
                        <TouchableOpacity style={styles.buttonTab} onPress={() => this.handleFocusTab0()}>
                            <Text style={tabFocused == 0 ? styles.textTabFocused : styles.textTab}>Work Order</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tabFocused == 1 ? styles.viewTabFocused : styles.viewTabTitle}>
                        <TouchableOpacity style={styles.buttonTab} onPress={() => this.handleFocusTab1()}>
                            <Text style={tabFocused == 1 ? styles.textTabFocused : styles.textTab}>Client</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    tabFocused == 0 ? (
                        <View style={styles.viewTabContent}>
                            <View style={styles.viewInformation}>
                                <Text style={styles.textLabel}>WO Number:</Text>
                                <Text style={styles.textInformation}>{workOrder.work_order_number}</Text>
                            </View>
                            <View style={styles.viewInformation}>
                                <Text style={styles.textLabel}>Date Assigned:</Text>
                                <Text style={styles.textInformation}>{moment(workOrder.date_assigned).format('DD MMM YYYY')}</Text>
                            </View>
                            <View style={styles.viewInformation}>
                                <Text style={styles.textLabel}>Employee 1:</Text>
                                <Text style={styles.textInformation}>{workOrder.full_name_employee_1}</Text>
                            </View>
                            <View style={styles.viewInformation}>
                                <Text style={styles.textLabel}>Employee 2:</Text>
                                <Text style={styles.textInformation}>
                                    {workOrder.full_name_employee_2 ?
                                        workOrder.full_name_employee_2 :
                                        "-"}
                                </Text>
                            </View>
                            <View style={styles.viewInformation}>
                                <Text style={styles.textLabel}>WO Description:</Text>
                                <Text style={styles.textInformation}>{workOrder.work_order_description}</Text>
                            </View>
                        </View>
                    ) : (
                            <View style={styles.viewTabContent}>
                                <View style={styles.viewInformation}>
                                    <Text style={styles.textLabel}>Company:</Text>
                                    <Text style={styles.textInformation}>{workOrder.company}</Text>
                                </View>
                                <View style={styles.viewInformation}>
                                    <Text style={styles.textLabel}>Address:</Text>
                                    <Text style={styles.textInformation}>{workOrder.address}</Text>
                                </View>
                                <View style={styles.viewInformation}>
                                    <Text style={styles.textLabel}>Phone:</Text>
                                    <Text style={styles.textInformation}>{workOrder.phone}</Text>
                                </View>
                                <View style={styles.viewInformation}>
                                    <Text style={styles.textLabel}>PIC:</Text>
                                    <Text style={styles.textInformation}>
                                        {workOrder.client_pic_name ? workOrder.client_pic_name : "-"}
                                    </Text>
                                </View>
                                <View style={styles.viewInformation}>
                                    <Text style={styles.textLabel}>PIC Contact:</Text>
                                    <Text style={styles.textInformation}>
                                        {workOrder.client_pic_contact ? workOrder.client_pic_contact : "-"}
                                    </Text>
                                </View>
                            </View>
                        )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonTab: {
        width: "100%"
    },
    container: {
        alignSelf: "center",
    },
    textInformation: {
        color: '#666666',
        flex: 1,
        textAlign: 'right'
    },
    textLabel: {
        color: '#666666',
        flex: 1,
        textAlign: 'left'
    },
    textLongInformation: {
        color: '#666666'
    },
    textTab: {
        color: '#666666',
        textAlign: 'center'
    },
    textTabFocused: {
        color: '#666666',
        textAlign: 'center',
    },
    viewInformation: {
        flexDirection: 'row',
        paddingVertical: 3
    },
    viewLongInformation: {
        paddingVertical: 3
    },
    viewTabContent: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: '#e6e6e6',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    viewTabFocused: {
        alignItems: "center",
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flex: 1,
        justifyContent: "center",
        paddingVertical: 10,
    },
    viewTabHeader: {
        flexDirection: 'row'
    },
    viewTabTitle: {
        alignItems: "center",
        backgroundColor: 'lightgrey',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flex: 1,
        justifyContent: "center",
        paddingVertical: 10
    }
});

export default TabViewWorkOrder;