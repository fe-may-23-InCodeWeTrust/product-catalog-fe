import React, { useEffect, useMemo, useState } from 'react';
// import * as ProductProvider from '../api/fetch_functions';

type Props = {
  children: React.ReactNode;
};

interface ContextValues {
  isLoading: boolean;
  favoritesCount: string[];
  setFavoritesCount: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CatalogContext = React.createContext({} as ContextValues);

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState<string[]>([]);

  const contextValues: ContextValues = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      favoritesCount,
      setFavoritesCount,
    }),
    [isLoading, favoritesCount],
  );

  return (
    <CatalogContext.Provider value={contextValues}>
      {children}
    </CatalogContext.Provider>
  );
};
