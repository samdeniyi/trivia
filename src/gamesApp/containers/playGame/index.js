import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PlayGame from '../../views/playGame';
import Loader from '../../views/loader';
import { gameService } from '../../services';
import History from '../../../utils/History';
import { utils } from '../../utils';

const PlayGameContainer = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [challengeId, setChallengeId] = useState('');
  const [correctanswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);

  const getQuestionAnswer = (question, selectedAnswer) => {
    setLoading(true);
    gameService.getQuestionAnswer(challengeId, question).then(res => {
      setLoading(false);
      if (res.status === 200) {
        const answer = res?.data.toString();
        setCorrectAnswer(answer);
        if (answer === selectedAnswer) {
          setScore(score + 1);
        }
      }
    })
  };

  const fetchChallenges = () => {
    setLoading(true);
    gameService.getAllChallenges().then(res => {
      setLoading(false);
      if (res.status === 200) {
        if (res?.data.length < 1) {
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

  const submitChallenge = () => {
    // TODO prevent multiple calls of this function
    setScore((score) => {
      setLoading(true);
      const payload = {
        challengeId,
        pointsAccrued: score,
        questionScore: 1,
        userId
      }
      gameService.submitChallenge(payload).then(res => {
        setLoading(false);
        // if(res.status === 200){
        console.log('scoreed ==>', score);
        if (score === questions.length && score > 0) {
          History.push('/games/result-pass', { totalScore: questions?.length });
        } else {
          History.push('/games/result-fail', { score, totalScore: questions?.length });
        }
        // }
        
      });
      return score;
    });
  }

  useEffect(() => {
    fetchChallenges();
  }, []);

  console.log('score', score);

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
          submitChallenge={submitChallenge}
        />}
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});

export default connect(mapStateToProps)(PlayGameContainer);
