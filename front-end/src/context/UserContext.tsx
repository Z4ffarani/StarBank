import { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  emailContext: string | null;
  setEmailContext: (email: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [emailContext, setEmailContext] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ emailContext, setEmailContext }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
