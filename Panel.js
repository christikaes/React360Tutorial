import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-360';

export default class Panel extends React.Component {
    render() {
        return (
            <View style={styles.panel}>
                <View style={styles.greetingBox}>
                    <Text style={styles.greeting}>
                        R2D2
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    panel: {
        // Fill the entire surface
        width: 1000,
        height: 600,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    greetingBox: {
        padding: 20,
        backgroundColor: '#000000',
        borderColor: 'blue',
        borderWidth: 2,
    },
    greeting: {
        fontSize: 30,
    },
});
