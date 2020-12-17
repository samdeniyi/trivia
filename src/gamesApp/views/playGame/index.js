import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Countdown from 'react-countdown';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { SpacesHeader } from '../../../components/spaces-header';
import Avatar from '../../assets/img/passport.jpeg';
import TermsDialog from '../terms';
import {
  FragmentWrapper,
  PageHeader,
  PageHeaderText,
  RightSide,
  HeaderAvatar,
  LeftSide,
  PageContainer,
  MiddleSide,
  CloseIconContainer,
  CloseIconText,
  QuestionContainer,
  QuestionText,
  ProgressbarContainer,
  CountdownText,
  AnswerContainer,
  AnswerCard,
  AnswerText,
} from './styles';
import { utils } from '../../utils';
import { useIsMount } from '../../hooks';


const PlayGame = ({ questions, getQuestionAnswer, correctanswer, setCorrectAnswer, score, loading, submitChallenge }) => {
  const isMount = useIsMount();

  const [openTerms, setOpenTerms] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [countdownInterval, setCountdownInterval] = useState(60000);

  const currentQuestion = questions[questionIndex];
  const todayInMilliSeconds = Date.now();

  const handleNextQuestion = useCallback(() => {
    setSelectedAnswer('');
    setCorrectAnswer('');
    setShowCorrectAnswer(false);
    setShowWrongAnswer(false);
    setCountdownInterval(60000);
    if (questionIndex < questions?.length - 1) {
      setQuestionIndex(questionIndex + 1);
      return;
    }
    if (questionIndex === questions?.length - 1) {
      submitChallenge();
    }
  }, [questionIndex, questions, setCorrectAnswer, submitChallenge])

  const handleSelectAnswer = (answer) => {
    if (showCorrectAnswer) {
      return;
    }
    if (showWrongAnswer) {
      return;
    }
    setSelectedAnswer(answer);
    getQuestionAnswer(currentQuestion.questionText, answer)
  }

  useEffect(() => {
    // Dont't trigger on first render
    if (!isMount) {
      if (!loading && !!selectedAnswer && !!correctanswer) {
        if (correctanswer === selectedAnswer) {
          setShowCorrectAnswer(true);
          setTimeout(() => {
            handleNextQuestion();
          }, 3000);
          return;
        }

        if (correctanswer !== '' && selectedAnswer !== '' && correctanswer !== selectedAnswer) {
          setShowWrongAnswer(true);
          setTimeout(() => {
            handleNextQuestion();
          }, 3000);
          return;
        }
      }

    }
  }, [selectedAnswer, correctanswer, loading, handleNextQuestion, isMount]);

  console.log(!!selectedAnswer, !!correctanswer)

  return (
    <Fragment>
      <SpacesHeader />
      <PageContainer>
        <TermsDialog open={openTerms} cancel={() => setOpenTerms(false)} />
        <FragmentWrapper>
          <PageHeader>
            <LeftSide>
              <HeaderAvatar src={Avatar} />
            </LeftSide>
            <MiddleSide>
              <PageHeaderText>Spaces Trivia!</PageHeaderText>
            </MiddleSide>
            <RightSide>
              <CloseIconContainer>
                <CloseIconText>
                  x
                </CloseIconText>
              </CloseIconContainer>
            </RightSide>
          </PageHeader>
          <ProgressbarContainer>
            <CircularProgressbar
              value={((questionIndex + 1) / questions?.length) * 100}
              text={`${questionIndex + 1}/${questions?.length}`}
              strokeWidth={8}
              styles={{
                root: {
                  height: '48px',
                  width: '48px',
                },
                trail: {
                  stroke: '#7eccff',
                },
                text: {
                  fill: '#fff',
                  fontSize: '30px'
                },
                path: {
                  stroke: '#f6c787',
                }
              }}
            />
            {(!showWrongAnswer && !showCorrectAnswer) && <Countdown
              overtime
              date={todayInMilliSeconds + countdownInterval}
              onComplete={() => handleNextQuestion()}
              // onComplete={() => window.location.reload()}
              renderer={props =>
                <CountdownText>
                  {`${utils.padNumWithZero(props.minutes)}:${utils.padNumWithZero(props.seconds)}`}
                </CountdownText>
              }
            />}
          </ProgressbarContainer>

          <QuestionContainer>
            <QuestionText>
              {currentQuestion?.questionText}
            </QuestionText>
          </QuestionContainer>
          <AnswerContainer>
            {utils.shuffleArray(currentQuestion?.options)?.map((item, index) =>
              <>

                {!showCorrectAnswer && <AnswerCard
                  bgc={(showWrongAnswer && item === selectedAnswer) ? '#da4822' : (showWrongAnswer && item === correctanswer) ? '#4dbe58' : "#fff"}
                  key={`${index}${item}`}
                  onClick={() => handleSelectAnswer(item)}
                >
                  <AnswerText color={(showWrongAnswer && (item === selectedAnswer || item === correctanswer)) ? "#fff" : "#000"}>
                    {item}
                  </AnswerText>
                </AnswerCard>}

                {showCorrectAnswer && (item === correctanswer) &&
                  <AnswerCard
                    bgc="#4dbe58"
                    key={`${item}${index}`}
                    onClick={() => handleSelectAnswer(item)}
                  >
                    <AnswerText color="#fff">
                      {item}
                    </AnswerText>
                  </AnswerCard>}
              </>

            )}
          </AnswerContainer>
        </FragmentWrapper>
      </PageContainer>
    </Fragment>
  );
};

PlayGame.propTypes = {};

export default PlayGame;