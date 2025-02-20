import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const cutoutSize = width * 0.7;

const Overlay: React.FC = () => {
    const scanLineAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanLineAnimation, {
                    toValue: cutoutSize - 10,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(scanLineAnimation, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.overlayContainer}>
            <View style={[styles.overlay, { height: height / 3 }]} />
            <View style={styles.middleContainer}>
                <View style={styles.scannerFrame}>
                    <Animated.View
                        style={[
                            styles.scannerLine,
                            { transform: [{ translateY: scanLineAnimation }] },
                        ]}
                    />
                </View>
            </View>
            <View style={[styles.overlay, { flex: 1 }]} />
        </View>
    );
};

export default Overlay;

const styles = StyleSheet.create({
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        width: '100%',
        height: "100%",
        justifyContent: "center",
    },
    overlay: {
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    middleContainer: {
        width: "100%",
        height: 400,
        alignItems: "center",
        marginBottom: 150,
    },
    scannerFrame: {
        width: cutoutSize,
        height: 300,
        borderWidth: 2,
        borderColor: "#25AE7A",
        borderRadius: 10,
        position: "relative",
        overflow: "hidden",
    },
    scannerLine: {
        position: "absolute",
        width: "100%",
        height: 2,
        backgroundColor: "#25AE7A",
    },
});
