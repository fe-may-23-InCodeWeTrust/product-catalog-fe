import React, { useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface ContextValues {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CatalogContext = React.createContext({} as ContextValues);

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const contextValues: ContextValues = useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading],
  );

  return (
    <CatalogContext.Provider value={contextValues}>
      {children}
    </CatalogContext.Provider>
  );
};
