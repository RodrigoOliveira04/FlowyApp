import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

type Props = { uri?: string; size?: number };

export default function Avatar({ uri, size = 64 }: Props) {
    return (
        <View style={[styles.wrapper, { width: size, height: size, borderRadius: size / 2 }]}>
            <Image
                source={uri ? { uri } : require('../../../assets/images/user.png')}
                style={{ width: size, height: size, borderRadius: size / 2 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { overflow: 'hidden', backgroundColor: '#eee' },
});