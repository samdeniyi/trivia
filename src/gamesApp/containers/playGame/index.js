import React, { useEffect, useState } from 'react';
import PlayGame from '../../views/playGame';
import Loader from '../../views/loader';
import { gameService } from '../../services';

const PlayGameContainer = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  
  const fetchChallenges = () => {
    setLoading(true);
    gameService.getAllChallenges().then(res => {
      setLoading(false);
      if(res.status === 200){
        setQuestions(res.data[0].questions);
      };
      console.log('get games response', res);
    })
  }

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      {questions && questions.length > 0 && <PlayGame questions={questions} />}
    </>
  );
}

export default PlayGameContainer;
