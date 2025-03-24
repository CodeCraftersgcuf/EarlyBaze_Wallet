import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "@/constants";

const actions = [
    { name: "send", label: "Send", bgColor: "#D9FADD", color: "#22A45D" },
    { name: "arrow-down", label: "Receive", bgColor: "#F4DBF7", color: "#9B59B6" },
    { name: "shopping-cart", label: "Buy", bgColor: "#DFE7FD", color: "#4688F1" },
    { name: "exchange", label: "Swap", bgColor: "#FEE4E2", color: "#E74C3C" },
];

const Actions = () => {
    return (
        <ImageBackground 
            source={images.assestBg} // Assuming `images.assestBg` is the image you want to use as background
            style={styles.actionsBackground}
        >
            <View style={styles.actionsContainer}>
                {actions.map((action, index) => (
                    <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: action.bgColor }]}>
                        <FontAwesome name={action.name} size={20} color={action.color} />
                        <Text style={styles.actionText}>{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    actionsBackground: {
        width: "100%",
        height: "40%", // Ensure it covers the area properly
        padding: 20, // Add some padding around the background if necessary
        borderRadius: 10, // Optional: Round corners if desired
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    actionButton: {
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    actionText: {
        fontSize: 12,
        marginTop: 5,
    },
});

export default Actions;
