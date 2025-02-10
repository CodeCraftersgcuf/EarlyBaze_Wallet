import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { images } from '@/constants';
import { useThemeColor } from '@/hooks/useThemeColor';

interface FileUploadFieldProps {
    onUploadFront: () => void;
    onUploadBack: () => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ onUploadFront, onUploadBack }) => {
    // Theme colors for light & dark mode
    const backgroundColor = useThemeColor({ light: '#F8FCFF', dark: '#1E1E1E' }, 'background');
    const textColor = useThemeColor({ light: '#222222', dark: '#FFFFFF' }, 'text');
    const borderColor = useThemeColor({ light: '#ccc', dark: '#555555' }, 'border');

    return (
        <View style={styles.container}>
            {/* Front Image Upload Box */}
            <TouchableOpacity 
                style={[styles.uploadBox, { backgroundColor, borderColor }]} 
                onPress={onUploadFront}
            >
                <Image style={styles.icon} source={images.front} />
                <Text style={[styles.label, { color: textColor }]}>Front Image</Text>
            </TouchableOpacity>

            {/* Back Image Upload Box */}
            <TouchableOpacity 
                style={[styles.uploadBox, { backgroundColor, borderColor }]} 
                onPress={onUploadBack}
            >
                <Image style={styles.icon} source={images.front} />
                <Text style={[styles.label, { color: textColor }]}>Back Image</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    uploadBox: {
        width: '48%',
        height: 120,
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 40, 
        height: 40,
        marginBottom: 5,
        resizeMode: 'contain',
    },
    label: {
        fontSize: 14,
    },
});

export default FileUploadField;
