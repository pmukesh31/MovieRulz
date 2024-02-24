import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { theme } from '../theme/index';

const { width, height } = Dimensions.get('window');

export default function Loading() {
    return (
        <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: height, width: width }}>
            <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
        </View>
    );
}
