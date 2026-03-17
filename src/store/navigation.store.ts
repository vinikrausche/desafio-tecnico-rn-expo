import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type NavigationModule = 'home' | 'stores' | 'products';

type NavigationStore = {
  lastVisitedModule: NavigationModule;
  setLastVisitedModule: (module: NavigationModule) => void;
};

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      lastVisitedModule: 'home',
      setLastVisitedModule: (module) => set({ lastVisitedModule: module }),
    }),
    {
      name: 'retail-hub-navigation',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
