import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import images from '@/constants/images';

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = width - 32; // Subtracting 16px margin on both sides
const ITEM_WIDTH = CONTAINER_WIDTH; // Match slide width to container width
const SLIDER_DATA = [
  { id: '1', image: images.slider_bg, heading: 'Get the best', subheading: 'crypto deals' },
  { id: '2', image: images.slider_bg, heading: 'Buy and sell', subheading: 'and swap your tokens at the best rate' },
  { id: '3', image: images.slider_bg, heading: 'Slide 3', subheading: 'Subheading for slide 3' },
];

const ImageSlider: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      moveToNextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const moveToNextSlide = () => {
    if (currentIndex.current < SLIDER_DATA.length - 1) {
      currentIndex.current += 1;
    } else {
      currentIndex.current = 0;
    }
    flatListRef.current?.scrollToIndex({ index: currentIndex.current, animated: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDER_DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.heading}>{item.heading}</Text>
            <Text style={styles.subheading}>{item.subheading}</Text>
          </View>
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
      />

      <TouchableOpacity style={styles.rightArrow} onPress={moveToNextSlide}>
        <Text style={styles.arrowText}>▶</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: 157,
    borderRadius: 20,
    backgroundColor: '#5E0C59',
    marginTop: 10,
    marginHorizontal: 16, // Added horizontal margin
    overflow: 'hidden', // Ensure rounded corners clip content
  },
  slide: {
    width: ITEM_WIDTH,
    height: 157,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Fill the entire space without distortion
  },
  heading: {
    position: 'absolute',
    top: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    left: 16, // Align with container padding
    right: 16, // Align with container padding
  },
  subheading: {
    position: 'absolute',
    top: 60,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    left: 16,
    right: 16,
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
    transform: [{ translateY: -20 }],
  },
  arrowText: {
    fontSize: 20,
    color: 'white',
  },
});

export default ImageSlider;