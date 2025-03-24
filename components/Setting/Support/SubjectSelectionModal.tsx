import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { images } from '@/constants';
interface SubjectSelectionModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    selectedSubject: string | null;
    setSelectedSubject: (subject: string) => void;
}

const subjects = ['Send', 'Receive', 'Buy', 'Swap', 'Withdraw', 'Others'];
const SubjectSelectionModal: React.FC<SubjectSelectionModalProps> = ({
    modalVisible,
    setModalVisible,
    selectedSubject,
    setSelectedSubject,
}) => {
    const textColor = useThemeColor(
        { light: '#222222', dark: '#FFFFFF' },
        'text'
    );
    const titleColor = useThemeColor(
        { light: '#25AE7A', dark: '#25AE7A' },
        'title'
    );
    const modalBackgroundColor = useThemeColor(
        { light: '#FFFFFF', dark: '#1E1E1E' },
        'modal'
    );
    const cardBackgroundColor = useThemeColor(
        { light: '#FFFFFF', dark: '#2A2A2A' },
        'card'
    );
    const borderColor = useThemeColor(
        { light: '#C2C2C2', dark: '#161616' },
        'border'
    );
    const radioBorderColor = useThemeColor(
        { light: '#00000080', dark: '#FFFFFF' },
        'radio'
    );
    const close = useThemeColor({ light: images.cross_white, dark: images.cross_black }, 'close');
    const backgroundColor = useThemeColor({ light: '#FFFFFF', dark: '#1A1A1A' }, 'background');
    const borderColorLine = useThemeColor({ light: '#D4D4D4', dark: '#0F714D' }, 'border');

    return (
        <Modal
            transparent
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContainer, { backgroundColor: modalBackgroundColor }]}>
                    {/* Modal Header */}
                    <View style={[styles.modalHeader, { borderColor: borderColorLine }]}>
                        <Text style={[styles.modalTitle, { color: titleColor, }]}>Subject</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.closeButton, { backgroundColor: backgroundColor }]}>
                            <Image source={close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>

                    {/* Subject List */}
                    <View style={styles.subjectList}>
                        <FlatList
                            data={subjects}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        { backgroundColor: cardBackgroundColor, borderColor },
                                        selectedSubject === item && styles.selectedOption,
                                    ]}
                                    onPress={() => {
                                        setSelectedSubject(item);
                                        setModalVisible(false);
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.radioContainer,
                                            selectedSubject === item && styles.radioSelected,
                                            { borderColor: radioBorderColor },
                                        ]}
                                    >
                                        {selectedSubject === item && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={[styles.optionText, { color: textColor }]}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        borderRadius: 16,
        paddingVertical: 16,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 6,
    },
    modalTitle: {
        fontSize: 16,
        marginLeft: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 6,
        borderRadius: 25,
        borderWidth: 0.5,
        marginRight: 13,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginVertical: 6,
        borderWidth: 1,
    },
    subjectList: {
        marginHorizontal: 12,
    },
    selectedOption: {
        borderWidth: 2,
        borderColor: '#C2C2C2',
    },
    optionText: {
        fontSize: 16,
    },
    radioContainer: {
        width: 16,
        height: 16,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    radioSelected: {
        borderWidth: 2,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#25AE7A',
    },
});

export default SubjectSelectionModal;
