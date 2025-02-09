import React from 'react';
import { View, StyleSheet } from 'react-native';
import AccountCard from './AccountCard';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Account {
  id: number;
  name: string;
  bankName: string;
  accountNumber: string;
  isDefault?: boolean;
  title?: string;
}

interface AccountListProps {
  accounts: Account[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  
}

const AccountList: React.FC<AccountListProps> = ({ accounts, onEdit, onDelete }) => {
  const backgroundColor = useThemeColor({ light: '#EFFEF9', dark: '#000000' }, 'background');

  return (
    <View style={[styles.listContainer, { backgroundColor }]}>
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          title={account.title}
          accountName={account.name}
          bankName={account.bankName}
          accountNumber={account.accountNumber}
          isDefault={account.isDefault}
          onEdit={() => onEdit(account.id)}
          onDelete={() => onDelete(account.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default AccountList;
