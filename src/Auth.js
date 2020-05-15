import AsyncStorage from '@react-native-community/async-storage';

const LOGIN_STATUS = 'LOGIN_STATUS';

export const setLoginStatus = async () => {
    try {
        await AsyncStorage.setItem(LOGIN_STATUS, 'IN');
    } catch (e) {
        
    }
};

export const removeLoginStatus = async () => {
    try {
        await AsyncStorage.removeItem(LOGIN_STATUS);    
    } catch (error) {
        
    }
}