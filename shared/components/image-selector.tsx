import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { LibraryPermissionStatus } from '../constants/library-permission-status.enum';

interface Props {
    imageUri: string;
    onPressCallback: (imageRef: string) => void;
    showPermissionSnack: boolean;
    setShowPermissionSnack: (value: boolean) => void;
    snackMessage: string;
    setSnackMessage: (value: string) => void;
    showSnackBar: boolean;
    setShowSnackBar: (value: boolean) => void;
}

export default function ImageSelector(props: Props) {
    const { imageUri, onPressCallback, setShowPermissionSnack, setShowSnackBar, setSnackMessage } = props;

    const [image, setImage] = useState<string>('');
    const [permissionStatus, setPermissionStatus] = useState<LibraryPermissionStatus>(
        LibraryPermissionStatus.NotSpecified
    );

    const pickImage = async () => {
        if (permissionStatus === LibraryPermissionStatus.Denied) {
            setSnackMessage('We need camera roll permissions to make this work. Grant access in Settings.');
            setShowPermissionSnack(true);
            return;
        }

        if (permissionStatus === LibraryPermissionStatus.NotSpecified) {
            const permissions = await ImagePicker.getMediaLibraryPermissionsAsync();
            if (permissions.status !== 'granted') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    setPermissionStatus(LibraryPermissionStatus.Denied);
                    setSnackMessage('Sorry, we need camera roll permissions to make this work.');
                    setShowSnackBar(true);
                    return;
                } else {
                    setPermissionStatus(LibraryPermissionStatus.Granted);
                }
            } else {
                setPermissionStatus(LibraryPermissionStatus.Granted);
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            onPressCallback(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            {imageUri ? (
                <Image
                    style={styles.image}
                    source={{
                        uri: imageUri,
                    }}
                />
            ) : (
                <Avatar.Icon style={styles.image} icon="image" />
            )}

            <Button onPress={pickImage}>Choose New</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'grey',
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 15,
    },
});
