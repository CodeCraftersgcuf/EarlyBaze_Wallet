import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type to hold the `refetchBalance` function
interface UserBalanceContextProps {
    refetchBalance: () => void;
    setRefetchBalance: React.Dispatch<React.SetStateAction<() => void>>;
}

// Create the context with an undefined initial value
const UserBalanceContext = createContext<UserBalanceContextProps | undefined>(undefined);

// Custom hook to use the UserBalanceContext
export const useUserBalanceContext = () => {
    const context = useContext(UserBalanceContext);
    if (!context) {
        throw new Error('useUserBalanceContext must be used within a UserBalanceProvider');
    }
    return context;
};

// UserBalanceProvider component to wrap the app and provide the context value
interface UserBalanceProviderProps {
    children: ReactNode;
}

export const UserBalanceProvider: React.FC<UserBalanceProviderProps> = ({ children }) => {
    const [refetchBalance, setRefetchBalance] = useState<() => void>(() => () => { });

    return (
        <UserBalanceContext.Provider value={{ refetchBalance, setRefetchBalance }}>
            {children}
        </UserBalanceContext.Provider>
    );
};
