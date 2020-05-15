import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import WorkOrderItem from './WorkOrderItem';

class ScrollViewWorkOrder extends React.Component {
    render() {

        const {
            handleWorkOrder,
            refreshControl,
            tabLabel,
            workOrders
        } = this.props;

        return (
            <ScrollView
                tabLabel={tabLabel}
                refreshControl={refreshControl}
            >
                {
                    workOrders && workOrders.length > 0 ? (
                        <View style={styles.viewListWorkOrder}>
                            {
                                workOrders.map(workOrder =>
                                    <View key={workOrder.id_work_order} style={styles.viewWorkOrder}>
                                        <WorkOrderItem
                                            workOrder={workOrder}
                                            handleWorkOrder={handleWorkOrder}
                                            color={
                                                workOrder.finalized == 1 ? '#1c313a' :
                                                    workOrder.cancelled == 1 ? '#e60000' :
                                                        workOrder.id_visit_attendance == null ? '#009900' :
                                                            workOrder.time_out == null ? '#ffcc00' :
                                                                '#004de6'
                                            }
                                        />
                                    </View>
                                )
                            }
                        </View>
                    ) : (
                            <View style={styles.viewNotAvailable}>
                                <Text>No work orders.</Text>
                            </View>
                        )
                }
            </ScrollView>
        );
    };
}

const styles = StyleSheet.create({
    viewListWorkOrder: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    viewNotAvailable: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: 20,
        width: "100%"
    },
    viewWorkOrder: {
        marginVertical: 5
    }
});

export default ScrollViewWorkOrder;