import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import History from '../../../utils/History';
import { gameService } from '../../services';
import Home from '../../views/home';
import Loader from '../../views/loader';

const HomeContainer = ({userId}) => {
  const [loading, setLoading] = useState(false);

  const getGamesUsername = () => {
    setLoading(true);
    gameService.getGamesUsername(userId).then(res => {
      setLoading(false);
      if(res.status === 200){
        localStorage.setItem('gamesUserName', res.data.gamesUserName);
      } else {
        History.push('/games/username');
      }
    })
  }

  useEffect(() => {
    getGamesUsername();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <Home />
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.user?.userId,
});

export default connect(mapStateToProps)(HomeContainer);
