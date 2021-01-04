import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PlayGame from '../../views/playGame';
import Loader from '../../views/loader';
import { gameService } from '../../services';
import History from '../../../utils/History';
import { toast } from 'react-toastify';
import uniqueBy from 'lodash.uniqby';
import { utils } from '../../utils';

const PlayGameContainer = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [challengeId, setChallengeId] = useState('');
  const [correctanswer, setCorrectAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [finalSubmissionDone, setFinalSubmissionDone] = useState(false);
  const [questionSubmission, setQuestionSubmission] = useState([]);
  const [checkingAnswer, setCheckingAnswer] = useState(false);
  const [questionDuration, setQuestionDuration] = useState(0);

  const getQuestionAnswer = (question, selectedAnswer, selectedOptions) => {
    setCheckingAnswer(true);
    gameService.getQuestionAnswer(challengeId, question).then(res => {
      setCheckingAnswer(false);
      if (res.status === 200) {
        const answer = res?.data.toString();
        setCorrectAnswer(answer);
        if (answer.toLowerCase() === selectedAnswer.toLowerCase()) {
          setScore(score + 1);
          sumbitAfterAnsweringQuestion(question, selectedAnswer, selectedOptions);
        } else {
          sumbitAfterAnsweringQuestion(question, selectedAnswer, selectedOptions);
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
          toast.error('No challenge found for today.')
        } else {
          // Pick a random challenge from the list of daily challenges
          const randomIndex = Math.floor(Math.random() * res?.data?.length);
          const challenge = res?.data[randomIndex];
          setQuestionDuration(challenge?.questionDurationInSeconds)
          const questions = utils.shuffleQuestionOptions(challenge?.questions);
          const shuffledQuestions = utils.shuffleArray(questions)
          setChallengeId(challenge?.id);
          setQuestions(shuffledQuestions);
        }
      };
    })
  }

  const sumbitAfterAnsweringQuestion = (question, selectedAnswer, selectedOptions) => {
    let questionAnswered = questionSubmission.concat({
      optionSelected: selectedAnswer,
      options: selectedOptions,
      questionText: question,
    }, []);
    setQuestionSubmission(uniqueBy(questionAnswered, 'questionText'));
    setScore((score) => {
      // setLoading(true);
      setQuestionSubmission((questionSubmission) => {
        const payload = {
          challengeId,
          pointsAccrued: score,
          questionScore: `${questions?.length}`,
          userId,
          questionSubmissions: questionSubmission,
        }
        gameService.submitChallenge(payload).then(res => {
          // setLoading(false);
        });
        return questionSubmission;
      });
      return score;
    });
  }

  const submitChallenge = () => {
    // TODO prevent multiple calls of this function
    setScore((score) => {
      setLoading(true);
      setQuestionSubmission((questionSubmission) => {
        const payload = {
          challengeId,
          pointsAccrued: score,
          questionScore: `${questions?.length}`,
          userId,
          questionSubmissions: questionSubmission,
        }
        setFinalSubmissionDone((finalSubmissionIsDone) => {
          if (finalSubmissionDone === false) {
            gameService.submitChallenge(payload).then(res => {
              setLoading(false);
              setFinalSubmissionDone(true);
              // if(res.status === 200){
              if (score === questions.length && score > 0) {
                return History.push('/games/result-pass', { totalScore: questions?.length });
              } else {
                History.push('/games/result-fail', { score, totalScore: questions?.length });
              }
              // }
            });
          }
          return finalSubmissionIsDone;
        })
        return questionSubmission;
      });
      return score;
    });
  }

  const fetchSubmissionsForToday = () => {
    setLoading(true);
    gameService.getSubmissionsForToday(userId).then(res => {
      setLoading(false);
      if (res.status === 200) {
        if (res.data) {
          History.push('/games/latest-results', { data: res.data });
          console.log('existing submission', res);
        }
      } else {
        fetchChallenges();
      }
    })
  };

  useEffect(() => {
    fetchSubmissionsForToday();
    // fetchChallenges();
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
          submitChallenge={submitChallenge}
          checkingAnswer={checkingAnswer}
          questionDuration={questionDuration}
        />}
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});

export default connect(mapStateToProps)(PlayGameContainer);
