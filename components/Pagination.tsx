import React, { Fragment } from 'react'
import { Share, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'

type PaginationProps = {
    data: {}[],
    x: SharedValue<number>
}

const PaginationItem = ({ x, index }: { x: SharedValue<number>, index: number }) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions()

    const animationDotStyle = useAnimatedStyle(() => {
        const widthAnimation = interpolate(
            x.value,
            [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
            [10, 20, 10],
            Extrapolate.CLAMP
        )
        const opacityAnimation = interpolate(
            x.value,
            [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        )

        return {
            width: widthAnimation,
            opacity: opacityAnimation
        }
    })


    return (
        <Animated.View style={[styles.dot, animationDotStyle]} />
    )
}

const Pagination = (props: PaginationProps) => {
    const { data: DATA, x } = props

    return (
        <View style={[styles.paginationContainer]}>
            {DATA.map((_, i) => {
                return (
                    <PaginationItem key={i} x={x} index={i} />
                )
            })}
        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        backgroundColor: 'orange'
    }
})