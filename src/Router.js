import 'react-native-gesture-handler';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './containers/Login';

import WorkOrderScreen from './containers/workOrder/WorkOrder';
import ProcessWorkOrderScreen from './containers/workOrder/ProcessWorkOrder';
import CheckInOutScreen from './containers/workOrder/CheckInOut';
import GetSignatureScreen from './containers/workOrder/GetSignature';

import AccountScreen from './containers/account/Account';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function WorkOrderStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WorkOrder"
                component={WorkOrderScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ProcessWorkOrder"
                component={ProcessWorkOrderScreen}
                options={{
                    headerTitle: "Work Order"
                }}
            />
            <Stack.Screen
                name="CheckInOut"
                component={CheckInOutScreen}
                options={({ route }) => ({
                    headerTitle: route.params.inOut == 0 ? 'Check In' : 'Check Out'
                })}
            />
            <Stack.Screen
                name="GetSignature"
                component={GetSignatureScreen}
                options={{
                    headerTitle: "Signature"
                }}
            />
        </Stack.Navigator>
    );
}

function TabScreen() {
    const styles = StyleSheet.create({
        imageIcon: {
            height: 29,
            width: 29
        }
    })
    return (
        <Tab.Navigator
            initialRouteName="WorkOrder"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconAddress;

                    if (route.name === 'Work Order') {
                        iconAddress = require('../assets/icon-work-order.png');
                    } else if (route.name === 'Account') {
                        iconAddress = require('../assets/icon-account.png');
                    }

                    return <Image
                        source={iconAddress}
                        style={styles.imageIcon}
                    />;
                },
                tabBarLabel: ({ focused }) => {
                    return focused ? <Text style={{ fontSize: 12 }}>{route.name}</Text> : null
                }
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'black',
                keyboardHidesTabBar: true
            }}
        >
            <Tab.Screen name="Work Order" component={WorkOrderStackScreen} options={{ title: 'Work Order' }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{ title: 'Account' }} />
        </Tab.Navigator>
    );
}

class RootNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { idEmployee } = this.props;
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {idEmployee == null ? (
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                    ) : (
                            <Stack.Screen
                                name="WorkOrder"
                                component={TabScreen}
                                options={{
                                    headerShown: false
                                }}
                            />
                        )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => ({
    idEmployee: state.login.idEmployee
});

export default connect(mapStateToProps)(RootNavigator);