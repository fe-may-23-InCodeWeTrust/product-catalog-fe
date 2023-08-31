import React, { useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface ContextValues {
  catalogTitle: string;
  iconTitle: string;
  setCatalogTitle: React.Dispatch<React.SetStateAction<string>>;
  setIconTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const CatalogContext = React.createContext({} as ContextValues);

export const CatalogProvider: React.FC<Props> = ({ children }) => {
  const [catalogTitle, setCatalogTitle] = useState('');
  const [iconTitle, setIconTitle] = useState('');

  const contextValues: ContextValues = useMemo(
    () => ({
      iconTitle,
      catalogTitle,
      setCatalogTitle,
      setIconTitle,
    }),
    [catalogTitle, iconTitle],
  );

  return (
    <CatalogContext.Provider value={contextValues}>
      {children}
    </CatalogContext.Provider>
  );
};
