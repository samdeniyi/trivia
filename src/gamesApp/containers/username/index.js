import React, { useState } from 'react';
import { toast } from "react-toastify";
import Username from '../../views/username';
import Loader from '../../views/loader';
import { gameService } from '../../services';
import History from '../../../utils/History';

const UsernameContainer = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (payload) => {
    setLoading(true)
    gameService.updateGamesUsername(payload).then(res => {
      setLoading(false)
      if(res.status === 200){
        History.push('/games');
      } else {
        toast.error(res.response ? res.response.data.message : "An error occured");
      }
    }).catch((error) => console.log('error', error));
  }

  return (
    <>
      <Loader loading={loading} />
      <Username handleSubmit={handleSubmit} />
    </>
  );
}

export default UsernameContainer;
