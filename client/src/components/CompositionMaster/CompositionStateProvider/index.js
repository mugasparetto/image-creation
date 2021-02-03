import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import initState from './init-state';
import reducer from './reducer';

export const CompositionDispatchContext = createContext(() => {});
export const CompositionStateContext = createContext(initState);

function CompositionStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <CompositionDispatchContext.Provider value={dispatch}>
      <CompositionStateContext.Provider value={state}>
        {children}
      </CompositionStateContext.Provider>
    </CompositionDispatchContext.Provider>
  );
}

CompositionStateProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CompositionStateProvider;
