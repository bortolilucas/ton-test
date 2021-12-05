import React, { useMemo, useState } from 'react';
import { LoadingContext } from '.';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const LoadingProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({ setLoading }), []);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {loading && <LoadingIndicator />}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
