import { createContext, useContext, useMemo, useState } from 'react';

export type SharedDataProviderProps = {
  children: React.ReactNode;
};

export type SharedData = {
  projectDirectoryPath: string | undefined;
  setProjectDirectoryPath: React.Dispatch<React.SetStateAction<string | undefined>>;
  saveFrequency: string | undefined;
  setSaveFrequency: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SharedDataContext = createContext<SharedData | undefined>(undefined);

export function SharedDataProvider({ children }: SharedDataProviderProps): JSX.Element {
  const [projectDirectoryPath, setProjectDirectoryPath] = useState<string>();
  const [saveFrequency, setSaveFrequency] = useState<string>();

  const value = useMemo<SharedData>(
    () => ({
      projectDirectoryPath,
      setProjectDirectoryPath,
      saveFrequency,
      setSaveFrequency,
    }),
    [
      projectDirectoryPath,
      saveFrequency,
    ]
  );

  return <SharedDataContext.Provider value={value}>{children}</SharedDataContext.Provider>;
}

export const useSharedData = (): SharedData => {
  const sharedData = useContext(SharedDataContext);
  if (sharedData === undefined) {
    throw new Error('useSharedData must be used within a SharedDataProvider');
  }

  return sharedData;
};
