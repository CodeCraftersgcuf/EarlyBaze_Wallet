import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getTransactionCurrency } from "@/utils/queries/appQueries";
import LoadingIndicator from "@/components/LoadingIndicator";
import { getFromStorage } from "@/utils/storage";

const BASE_URL = "https://earlybaze.hmstech.xyz/storage/";

const Transactions = ({ assetName }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedToken = await getFromStorage("authToken");
            setToken(fetchedToken);
            console.log("🔹 Retrieved Token:", fetchedToken);
        };

        fetchUserData();
    }, []);

    // Fetch transaction data using API
    const { data, error, isLoading } = useQuery({
        queryKey: ["currency", assetName],
        queryFn: () => getTransactionCurrency(token, assetName),
        enabled: !!token,
    });

    if (isLoading) return <LoadingIndicator />;
    if (error) return <Text>Error fetching transactions</Text>;

    const transactions = data?.data?.transactions || [];
    console.log("The data:", data);

    return (
        <View style={styles.activityContainer}>
            <Text style={styles.activityDate}>Activity</Text>
            {transactions.length > 0 ? (
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const imageUrl = item.user?.profile_picture
                            ? `${BASE_URL}${item.user.profile_picture}`
                            : "https://via.placeholder.com/40"; // Default image

                        return (
                            <View style={styles.transactionItem}>
                                {/* Profile Image */}
                                <Image source={{ uri: imageUrl }} style={styles.transactionImage} />
                                
                                {/* Transaction Details */}
                                <View style={styles.transactionDetails}>
                                    <Text style={styles.transactionType}>
                                        {item.type === "withdrawTransaction" ? "Send" : "Receive"}
                                    </Text>
                                    <Text style={styles.transactionAmount}>
                                        {item.amount} {item.currency}
                                    </Text>
                                </View>
                                <Text style={styles.transactionPrice}>
                                    {item.amount_usd ? `$${item.amount_usd}` : "N/A"}
                                </Text>
                            </View>
                        );
                    }}
                />
            ) : (
                <Text style={styles.noTransactions}>No transactions found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    activityContainer: {
        padding: 16,
        backgroundColor: "white",
    },
    activityDate: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    transactionItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        marginBottom: 10,
    },
    transactionImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ddd",
    },
    transactionDetails: {
        flex: 1,
        marginLeft: 10,
    },
    transactionType: {
        fontSize: 14,
        fontWeight: "bold",
    },
    transactionAmount: {
        fontSize: 12,
        color: "#666",
    },
    transactionPrice: {
        fontSize: 14,
        fontWeight: "bold",
    },
    noTransactions: {
        textAlign: "center",
        fontSize: 16,
        color: "#999",
        marginTop: 20,
    },
});

export default Transactions;
