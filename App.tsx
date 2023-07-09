
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ViewToken,
  useWindowDimensions,
} from 'react-native';

import Animated, {
  useSharedValue, useAnimatedScrollHandler, useAnimatedRef
} from 'react-native-reanimated';

import data from './constants';
import ImageItem from './components/ImageItem';
import Pagination from './components/Pagination';
import CustomButton from './components/CustomButton';

function App(): JSX.Element {

  const x = useSharedValue(0)
  const flatListRef = useAnimatedRef<any>()
  const flatListIndex = useSharedValue<number>(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x
    }
  })

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    flatListIndex.value = viewableItems[0].index || 0
    console.log('viewableItems[0].index',viewableItems[0].index)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        keyExtractor={({ id }) => id.toString()}
        data={data}
        renderItem={({ item, index }) => {
          return <ImageItem {...item} index={index} x={x} />
        }}
        scrollEventThrottle={16}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={[styles.bottomContainer]}>
        <Pagination data={data} x={x} />
        <CustomButton flatListRef={flatListRef} flastListIndex={flatListIndex} flatListLength={data.length} />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E9B0'
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  }
});

export default App;
