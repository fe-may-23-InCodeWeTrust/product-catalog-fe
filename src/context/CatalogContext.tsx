import React, { useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface ContextValues {
  isLoading: boolean;
  category: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CatalogContext = React.createContext({} as ContextValues);

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contextValues: ContextValues = useMemo(
    () => ({
      isLoading,
      category,
      setCategory,
      setIsLoading,
    }),
    [setCategory, isLoading],
  );

  return (
    <CatalogContext.Provider value={contextValues}>
      {children}
    </CatalogContext.Provider>
  );
};
