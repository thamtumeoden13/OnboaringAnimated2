import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'

type CustomButtonProps = {
    flatListRef: any,
    flastListIndex: any,
    flatListLength: any
}

const CustomButton = (props: CustomButtonProps) => {

    const { flatListRef, flastListIndex, flatListLength } = props

    const buttonAnimationStyle = useAnimatedStyle(() => {
        return {
            width: flastListIndex.value === flatListLength - 1 ? withSpring(140) : withSpring(60),
            height: 60
        }
    })

    const arrowAnimationStyle = useAnimatedStyle(() => {
        return {
            width: 30,
            height: 30,
            opacity: flastListIndex.value === flatListLength - 1 ? withTiming(0) : withTiming(1),
            transform: [{
                translateX: flastListIndex.value === flatListLength - 1 ? withTiming(100) : withTiming(0),
            }]
        }
    })

    const textAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: flastListIndex.value === flatListLength - 1 ? withTiming(1) : withTiming(0),
            transform: [{
                translateX: flastListIndex.value === flatListLength - 1 ? withTiming(0) : withTiming(-100),
            }]
        }
    })

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (flastListIndex.value < flatListLength - 1) {
                    flatListRef.current.scrollToIndex({ index: flastListIndex.value + 1 })
                } else {
                    console.log('NAVIGATE TO OTHER SCREEN')
                }
            }}
        >
            <Animated.View style={[styles.container, buttonAnimationStyle]}>
                <Animated.Text style={[styles.textButton, textAnimationStyle]}>Get Started</Animated.Text>
                <Animated.Image
                    source={require('../assets/ArrowIcon.png')}
                    style={[styles.arrow, arrowAnimationStyle]}
                />
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 10,
        borderRadius: 100
    },
    arrow: {
        position: 'absolute'
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        position: 'absolute'
    }
})