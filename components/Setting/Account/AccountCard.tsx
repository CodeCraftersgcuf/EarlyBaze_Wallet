import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

interface AccountCardProps {
    accountName: string;
    bankName: string;
    accountNumber: string;
    title?: string;
    isDefault?: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
    accountName,
    bankName,
    accountNumber,
    isDefault = false,
    title,
    onEdit,
    onDelete,
}) => {
    const cardBackgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'card');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');

    return (
        <View style={[styles.cardContainer, { backgroundColor: cardBackgroundColor }]}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.tab}>
                    <Text style={styles.accountTitle}>{title}</Text>
                </View>
                {isDefault && <Text style={styles.defaultTag}>Default</Text>}
            </View>

            {/* Account Details */}
            <View style={styles.details}>
                <View style={styles.row}>
                    <Text style={[styles.label, { color: textColor }]}>Bank Name</Text>
                    <Text style={[styles.value, { color: textColor }]}>{bankName}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.label, { color: textColor }]}>Account Name</Text>
                    <Text style={[styles.value, { color: textColor }]}>{accountName}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.label, { color: textColor }]}>Account Number</Text>
                    <Text style={[styles.value, { color: textColor }]}>{accountNumber}</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.iconButton} onPress={onEdit}>
                    <Ionicons name="create-outline" size={20} color="#25AE7A" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={onDelete}>
                    <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        padding: 15,
        marginBottom: 40,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: '#FFFFFF',
    },
    header: {
        position: 'absolute',
        top: -28,
        flexDirection: 'row',
    },
    tab: {
        width:110,
        backgroundColor: '#17A167',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 60,
        borderBottomLeftRadius: 0,  // Add this line if you want rounded corners on the bottom as well
        borderBottomRightRadius: 0, // Add this line if you want rounded corners on the bottom as well
    },
  accountTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    defaultTag: {
        fontSize: 12,
        fontWeight: '600',
        color: '#17A167',
        backgroundColor: '#EFFEF9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginLeft: 5,
    },
    details: {
        marginTop: 10,
        paddingHorizontal: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#777',
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    actions: {
        flexDirection: 'row',
        marginTop: 15,
    },
    iconButton: {
        backgroundColor: '#EFFEF9',
        padding: 10,
        borderRadius: 50,
        marginHorizontal: 5,
    },
});

export default AccountCard;
