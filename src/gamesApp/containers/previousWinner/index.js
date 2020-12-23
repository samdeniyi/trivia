import React, { useEffect, useState } from 'react';
import { gameService } from '../../services';
import PreviousWinner from '../../views/previousWinners';
import Loader from '../../views/loader';

const PreviousWinnerContainer = () => {
  const [loading, setLoading] = useState(false);
  const [winners, setWinners] = useState([]);

  const getTopUsers = () => {
    setLoading(true);
    gameService.getTopUsers().then(res => {
      setLoading(false);
      if(res.status === 200){
        console.log(res);
        setWinners(res?.data);
      }
    })
  }

  useEffect(() => {
    getTopUsers();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <PreviousWinner
         winners={winners}
      />
    </>
  );
}

export default PreviousWinnerContainer;
