import React, { useEffect, useState } from 'react';
// import History from '../../../utils/History';
import Home from '../../views/home';
import Loader from '../../views/loader';

const HomeContainer = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // History.push('/games/username');
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <Home />
    </>
  );
}

export default HomeContainer;
