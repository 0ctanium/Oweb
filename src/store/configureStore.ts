import initStoreDev from './configureStore.dev';
import initStoreProd from './configureStore.prod';
import { useMemo } from 'react';
import stateType from '@reducers/types';
import { Store } from 'redux';

let store: Store<stateType>;

const initStore =
  process.env.NODE_ENV === 'production' ? initStoreProd : initStoreDev;

export const initializeStore = (
  preloadedState: stateType
): Store<stateType> => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: stateType): Store<stateType> {
  return useMemo<Store<stateType>>(() => initializeStore(initialState), [
    initialState,
  ]);
}
