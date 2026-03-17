import { create } from 'zustand';

export type AppBootstrapStatus = 'idle' | 'starting' | 'ready' | 'error';

type AppBootstrapStore = {
  errorMessage: string | null;
  markError: (errorMessage: string) => void;
  markReady: () => void;
  markStarting: () => void;
  status: AppBootstrapStatus;
};

export const useAppBootstrapStore = create<AppBootstrapStore>((set) => ({
  errorMessage: null,
  markError: (errorMessage) =>
    set({
      errorMessage,
      status: 'error',
    }),
  markReady: () =>
    set({
      errorMessage: null,
      status: 'ready',
    }),
  markStarting: () =>
    set({
      errorMessage: null,
      status: 'starting',
    }),
  status: 'idle',
}));
