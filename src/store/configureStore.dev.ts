import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '@reducers';
import { stateType } from '@reducers/types';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function initStore(
  preloadedState?: stateType
): Store<stateType> {
  // Redux Configuration
  const middleware = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  try {
    if (typeof window !== 'undefined') {
      const logger = createLogger({
        level: 'info',
        collapsed: true,
      });

      // Skip redux logs in console during the tests
      if (process.env.NODE_ENV !== 'test') {
        middleware.push(logger);
      }
    }
  } catch (e) {}

  // Apply Middleware & Compose Enhancers
  const enhancer = composeWithDevTools(applyMiddleware(...middleware));

  // Create Store
  // @ts-ignore
  return createStore(rootReducer, preloadedState, enhancer);
}
