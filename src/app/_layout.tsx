import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: 'Home' }} />
                <Stack.Screen name="profile/profile" options={{ title: 'Profile' }} />
                <Stack.Screen name="profile/edit" options={{ title: 'Edit Profile' }} />
                <Stack.Screen name="profile/settings" options={{ title: 'Settings' }} />
            </Stack>
        </SafeAreaProvider>
    );
}