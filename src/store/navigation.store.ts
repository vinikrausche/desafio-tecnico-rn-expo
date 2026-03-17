import { create } from 'zustand';

export type NavigationModule = 'home' | 'stores' | 'products';

type NavigationStore = {
  lastVisitedModule: NavigationModule;
  setLastVisitedModule: (module: NavigationModule) => void;
};

// ! A navegacao usa estado global simples; persistencia nao e critica para o fluxo
// ! e a versao web fica mais estavel sem o middleware de storage do Zustand.
export const useNavigationStore = create<NavigationStore>((set) => ({
  lastVisitedModule: 'home',
  setLastVisitedModule: (module) => set({ lastVisitedModule: module }),
}));
