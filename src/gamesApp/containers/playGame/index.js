import React, { useEffect, useState } from 'react';
import PlayGame from '../../views/playGame';
import Loader from '../../views/loader';
import { gameService } from '../../services';
import History from '../../../utils/History';
import { utils } from '../../utils';

const PlayGameContainer = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [challengeId, setChallengeId] = useState('');
  const [correctanswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);

  const getQuestionAnswer = (question, selectedAnswer) => {
    setLoading(true);
    gameService.getQuestionAnswer(challengeId, question).then(res => {
      setLoading(false);
      if(res.status === 200){
        const answer = res?.data.toString();
        setCorrectAnswer(answer);
        if(answer === selectedAnswer){
          setScore(score + 1);
        }
      }
    })
  };
  
  const fetchChallenges = () => {
    setLoading(true);
    gameService.getAllChallenges().then(res => {
      setLoading(false);
      if(res.status === 200){
        if(res?.data.length < 1){
          History.push('/games');
        } else {
        // Pick a random challenge from the list of daily challenges
        const randomIndex = Math.floor(Math.random() * res?.data.length);
        const challenge = res?.data[randomIndex];
        setChallengeId(challenge?.id);
        setQuestions(utils.shuffleArray(JSON.parse(challenge?.questions)));
        }
        
      };
      console.log('get games response =>', res);
    })
  }

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      {questions && questions.length > 0 && 
        <PlayGame 
          questions={questions}
          getQuestionAnswer={getQuestionAnswer} 
          correctanswer={correctanswer}
          setCorrectAnswer={setCorrectAnswer}
          score={score}
          loading={loading}
          setLoading={setLoading}
        />}
    </>
  );
}

export default PlayGameContainer;
