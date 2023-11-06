import React, { FC, useEffect } from "react";
import { View, Text } from "react-native";
import { PermissionsAndroid } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";


const PushNotifiee: FC = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    useEffect(() => {

        // Foreground message handler
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            showNotification(remoteMessage.notification!);

        });

        // To generate FCM Token
        const checkToken = async (): Promise<void> => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken);
            }
        }
        checkToken()

        return unsubscribe;
    }, []);

    // Access android local notification

    const showNotification = (notification: FirebaseMessagingTypes.Notification) => {
        PushNotification.localNotification({ title: notification.title, message: String(notification.body) });
    }
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{
                fontSize: 22,
                fontWeight: '600'
            }}>Push Notification</Text>
        </View>
    )
}

export default PushNotifiee;