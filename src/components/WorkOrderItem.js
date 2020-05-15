import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

class WorkOrderItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { color, handleWorkOrder, workOrder } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.viewLine, { backgroundColor: color }]} />
                <TouchableOpacity style={styles.button} onPress={() => handleWorkOrder(workOrder)}>
                    <View style={styles.viewDetail}>
                        <Text style={styles.textCompany}>{workOrder.company}</Text>
                        <View style={styles.viewDetailDescription}>
                            <View style={styles.viewIcon}>
                                <Image
                                    style={styles.icon}
                                    source={require('../../assets/icon-address.png')}
                                />
                            </View>
                            <View style={styles.viewDetailText}>
                                <Text style={styles.textDetail}>{workOrder.address}</Text>
                            </View>
                        </View>
                        <View style={styles.viewDetailDescription}>
                            <View style={styles.viewIcon}>
                                <Image
                                    source={require('../../assets/icon-phone.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <View style={styles.viewDetailText}>
                                <Text style={styles.textDetail}>{workOrder.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.viewDetailDescription}>
                            <View style={styles.viewIcon}>
                                <Image
                                    style={styles.icon}
                                    source={require('../../assets/icon-description.png')}
                                />
                            </View>
                            <View style={styles.viewDetailText}>
                                <Text style={styles.textDetail}>{workOrder.work_order_description}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 3,
        paddingLeft: 5
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
    },
    icon: {
        height: 20,
        tintColor: '#666666',
        width: 20
    },
    textCheckIn: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    textCompany: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textDetail: {
        color: '#666666'
    },
    viewDetail: {
        flex: 1,
        paddingVertical: 5,
        marginHorizontal: 5
    },
    viewDetailDescription: {
        flexDirection: 'row',
        marginTop: 5
    },
    viewDetailText: {
        flex: 1,
    },
    viewIcon: {
        alignItems: 'center',
        marginRight: 3
    },
    viewLine: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        width: 5,
    }
});

export default WorkOrderItem;