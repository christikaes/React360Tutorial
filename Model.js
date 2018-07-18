import React from 'react';
import {
    View,
    AmbientLight,
    asset
} from 'react-360';
import Entity from 'Entity';
export default class Model extends React.Component {

    render() {
        return (
            <View>
                <AmbientLight intensity={5} />
                <Entity source={{ obj: asset('r2d2.obj'), mtl: asset('r2d2.mtl') }}
                    lit={true}
                    style={{ transform: [{ rotateY: 60 }] }}
                />
            </View>
        )
    }
}