import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import History from '../../../utils/History';
import Home from '../../views/home';
import Loader from '../../views/loader';

const HomeContainer = (gamesUserName) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const gamesUserName = localStorage.getItem('gamesUserName')
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    if(!gamesUserName){
      History.push('/games/username');
    }
  }, [gamesUserName]);

  return (
    <>
      <Loader loading={loading} />
      <Home />
    </>
  );
}

const mapStateToProps = (state) => ({
  gamesUserName: state.user?.gamesUserName,
});

export default connect(mapStateToProps)(HomeContainer);
