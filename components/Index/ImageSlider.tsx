import React, { useRef, useEffect, useCallback, useState } from 'react';
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



//Code related to the integration
import { useQuery } from '@tanstack/react-query';
import { getSlide } from '@/utils/queries/appQueries';
import { getFromStorage } from "@/utils/storage";




const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = width - 32;
const ITEM_WIDTH = CONTAINER_WIDTH;
const SLIDER_DATA = [
  { id: '1', image: images.slider_bg, heading: 'Get the best', subheading: 'crypto deals' },
  { id: '2', image: images.slider_bg, heading: 'Buy and sell', subheading: 'and swap your tokens at the best rate' },
  { id: '3', image: images.slider_bg, heading: 'Slide 3', subheading: 'Subheading for slide 3' },
];

const ImageSlider: React.FC = () => {
  const [token, setToken] = useState<string | null>(null); // State to hold the token

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);

  // Fetch the token and user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedToken = await getFromStorage("authToken");
      setToken(fetchedToken);
      console.log("🔹 Retrieved Token:", fetchedToken);
    };

    fetchUserData();
  }, []);

  const { data: slideResponse, error: slideError, isLoading: slideLoading } = useQuery<SlideResponse, Error>(
    {
      queryKey: ["slide", token],
      queryFn: () => getSlide({ token }),
      enabled: !!token, // Only run the query when the token is available
    }
  );

  console.log("🔹 Slide Response:", slideResponse);


 
  const slideCount = slideResponse?.data?.length || 0;

  const moveToNextSlide = useCallback(() => {
    if (slideCount <= 1) return; // 🔐 prevent if only 1 item

    if (currentIndex.current < slideCount - 1) {
      currentIndex.current += 1;
    } else {
      currentIndex.current = 0;
    }

    flatListRef.current?.scrollToIndex({
      index: currentIndex.current,
      animated: true,
    });
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1) return; // 🛑 skip if only one slide

    const interval = setInterval(() => {
      moveToNextSlide();
    }, 9000);

    return () => clearInterval(interval);
  }, [moveToNextSlide, slideCount]);


  return (
    <View style={styles.container} >
      <FlatList
        ref={flatListRef}
        data={slideResponse?.data?.map(item => ({
          id: item.id.toString(),
          image: { uri: `https://earlybaze.hmstech.xyz/storage/${item.attachment}` },
          heading: item.title,
          // subheading: item.url
        })) ?? []} horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            {/* <Text style={styles.heading}>{item.heading}</Text> */}
            {/* <Text style={styles.subheading}>{item.subheading}</Text> */}
          </View>
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
      />

      <TouchableOpacity style={styles.rightArrow} onPress={moveToNextSlide}>
        <Text style={styles.arrowText}>▶</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    height: 157,
    borderRadius: 20,
    backgroundColor: '#5E0C59',
    marginTop: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  slide: {
    width: ITEM_WIDTH,
    height: 157,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    left: 16,
    right: 16,
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
