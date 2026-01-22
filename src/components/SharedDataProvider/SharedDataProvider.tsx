import { Arc, MarkovNode, SharedData, SharedDataProviderProps } from '@/types';
import { createContext, useContext, useMemo, useState } from 'react';

export const SharedDataContext = createContext<SharedData | undefined>(undefined);

export function SharedDataProvider({ children }: SharedDataProviderProps): JSX.Element {
  const [projectDirectoryPath, setProjectDirectoryPath] = useState<string>();
  const [currentNodes, setCurrentNodes] = useState<Array<MarkovNode> | null>(null);
  const [currentArcs, setCurrentArcs] = useState<Array<Arc> | null>(null);

  const value = useMemo<SharedData>(
    () => ({
      projectDirectoryPath,
      setProjectDirectoryPath,
      currentNodes,
      setCurrentNodes,
      currentArcs,
      setCurrentArcs,
    }),
    [
      projectDirectoryPath,
      currentNodes,
      currentArcs,
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
