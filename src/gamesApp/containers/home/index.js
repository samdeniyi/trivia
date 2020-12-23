import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import History from '../../../utils/History';
import { gameService } from '../../services';
import Home from '../../views/home';
import Loader from '../../views/loader';

const HomeContainer = ({userId}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState('');

  const getGamesUsername = () => {
    setLoading(true);
    gameService.getGamesUsername(userId).then(res => {
      setLoading(false);
      if(res.status === 200){
        if(res.data && res.data.gamesUserName){
          localStorage.setItem('gamesUserName', res.data.gamesUserName);
          setUserName(res?.data?.gamesUserName);
        } else {
          History.push('/games/username');
        }
      } else {
        History.push('/games/username');
      }
    })
  };

  useEffect(() => {
    getGamesUsername();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <Home
        username={username}
       />
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.user?.userId,
});

export default connect(mapStateToProps)(HomeContainer);
