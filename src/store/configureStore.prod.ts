import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@reducers';
import { stateType } from '@reducers/types';

export default function initStore(
  preloadedState?: stateType
): Store<stateType> {
  const enhancer = applyMiddleware(thunk);

  // @ts-ignore
  return createStore(rootReducer, preloadedState, enhancer);
}
