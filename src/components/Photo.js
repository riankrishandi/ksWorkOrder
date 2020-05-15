import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class Photo extends React.Component {

    constructor(props) {
        super(props);
    }

    takePhoto = () => {
        const { handleTakePhoto } = this.props;

        var options = {
            title: 'Take Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('Cancelled.');
            } else if (response.error) {
                console.log('Error: ', response.error);
            } else {
                let photoDataBase64 = response.data;
                
                handleTakePhoto(photoDataBase64);
            }
        });
    };

    render() {
        const { handleRemovePhoto, photoDataBase64 } = this.props;

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'flex-start', flex: 1 }}>
                        <View style={styles.viewPhoto}>
                            <Image
                                resizeMode={"contain"}
                                source={
                                    photoDataBase64 == null ? require('../../assets/icon-image.png') :
                                        { uri: 'data:image/jpeg;base64,' + photoDataBase64 }
                                }
                                style={styles.image}
                            />
                        </View>
                    </View>
                    <View style={styles.viewButton}>
                        <TouchableOpacity onPress={() => this.takePhoto()} style={styles.buttonLeft}>
                            <Image
                                source={require('../../assets/icon-camera.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={photoDataBase64 == null ? true : false}
                            onPress={() => handleRemovePhoto()}
                            style={styles.buttonRight}
                        >
                            <Image
                                source={require('../../assets/icon-delete.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonLeft: {
        alignSelf: 'center',
        backgroundColor: 'lightgrey',
        borderBottomLeftRadius: 5,
        borderColor: '#a6a6a6',
        borderTopLeftRadius: 5,
        borderRightWidth: 0.5,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    buttonRight: {
        alignSelf: 'center',
        backgroundColor: 'lightgrey',
        borderBottomRightRadius: 5,
        borderColor: '#a6a6a6',
        borderTopRightRadius: 5,
        borderLeftWidth: 0.5,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    container: {
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        padding: 15
    },
    icon: {
        height: 25,
        width: 25
    },
    image: {
        height: 100,
        width: 100
    },
    textTakePhoto: {
        color: 'white',
        fontSize: 15,
        marginHorizontal: 15
    },
    viewButton: {
        flex: 1,
        flexDirection: 'row',
    },
    viewPhoto: {
        borderRadius: 5,
        height: 100,
        width: 100
    }
});

export default Photo;