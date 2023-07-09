import React from 'react'
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'


type ItemProps = {
    id: number,
    image: any,
    title: string,
    text: string,
    index: number,
    x: SharedValue<number>
}


const ImageItem = (props: ItemProps) => {

    const { image, title, text, index, x } = props
    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const imageAnimationStyle = useAnimatedStyle(() => {
        const opacityAnimation = interpolate(
            x.value,
            [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
            [0, 1, 0],
            Extrapolate.CLAMP
        )

        const translateYAnimation = interpolate(
            x.value,
            [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
            [100, 0, 100],
            Extrapolate.CLAMP
        )

        return {
            width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8,
            opacity: opacityAnimation,
            transform: [{ translateY: translateYAnimation }]
        }
    })

    const contentAnimationStyle = useAnimatedStyle(() => {
        const opacityAnimation = interpolate(
            x.value,
            [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
            [0, 1, 0],
            Extrapolate.CLAMP
        )

        const translateYAnimation = interpolate(
            x.value,
            [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
            [100, 0, 100],
            Extrapolate.CLAMP
        )

        return {
            opacity: opacityAnimation,
            transform: [{ translateY: translateYAnimation }]
        }
    })

    return (
        <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
            <Animated.Image
                source={image}
                style={[imageAnimationStyle]}
            />
            <Animated.View style={contentAnimationStyle}>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text style={styles.textStyle}>{text}</Text>
            </Animated.View>
        </View >
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    imageStyle: {
    },
    titleStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textStyle: {
        textAlign: 'center',
        color: '#000',
        lineHeight: 20,
        marginHorizontal: 35,
    }
})

export default ImageItem