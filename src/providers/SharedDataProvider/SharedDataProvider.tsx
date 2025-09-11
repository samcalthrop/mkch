import { createContext, useContext, useMemo, useState } from 'react';
import { TreeNodeData } from '@mantine/core';

export type SharedDataProviderProps = {
  children: React.ReactNode;
};

export type SharedData = {
  selectedTreeNodeData: TreeNodeData | undefined;
  setSelectedTreeNodeData: React.Dispatch<React.SetStateAction<TreeNodeData | undefined>>;
  rootDirPath: string | undefined;
  setRootDirPath: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedFile: string | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | undefined>>;
  title: string | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  saveFrequency: string | undefined;
  setSaveFrequency: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SharedDataContext = createContext<SharedData | undefined>(undefined);

export function SharedDataProvider({ children }: SharedDataProviderProps): JSX.Element {
  const [selectedTreeNodeData, setSelectedTreeNodeData] = useState<TreeNodeData>();
  const [rootDirPath, setRootDirPath] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [saveFrequency, setSaveFrequency] = useState<string>();

  const value = useMemo<SharedData>(
    () => ({
      selectedTreeNodeData,
      setSelectedTreeNodeData,
      rootDirPath,
      setRootDirPath,
      selectedFile,
      setSelectedFile,
      title,
      setTitle,
      saveFrequency,
      setSaveFrequency,
    }),
    [
      selectedTreeNodeData,
      rootDirPath,
      selectedFile,
      title,
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
