import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Countdown from 'react-countdown';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { SpacesHeader } from '../../../components/spaces-header';
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
import QuitGameDialog from './quitGameModal';


const PlayGame = ({ questions, getQuestionAnswer, correctanswer, setCorrectAnswer, loading, submitChallenge, avatar }) => {
  const isMount = useIsMount();

  const [openQuitGame, setOpenQuitGame] = useState(false);
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
      submitChallenge(currentQuestion?.questionText, selectedAnswer, currentQuestion?.options);
    }
  }, [questionIndex, questions, setCorrectAnswer, submitChallenge, currentQuestion.questionText, currentQuestion.options, selectedAnswer]);

  const handleSelectAnswer = (answer) => {
    if (showCorrectAnswer) {
      return;
    }
    if (showWrongAnswer) {
      return;
    }
    setSelectedAnswer(answer);
    getQuestionAnswer(currentQuestion?.questionText, answer, currentQuestion?.options);
  }

  useEffect(() => {
    // Dont't trigger on first render
    if (!isMount) {
      if (!loading && !!selectedAnswer && !!correctanswer) {
        if (correctanswer === selectedAnswer) {
          setShowCorrectAnswer(true);
          setTimeout(() => {
            handleNextQuestion();
          }, 4000);
          return;
        }

        if (correctanswer !== '' && selectedAnswer !== '' && correctanswer !== selectedAnswer) {
          setShowWrongAnswer(true);
          setTimeout(() => {
            handleNextQuestion();
          }, 4000);
          return;
        }
      }

    }
  }, [correctanswer]);

  return (
    <Fragment>
      <SpacesHeader />
      <PageContainer>
        <QuitGameDialog open={openQuitGame} cancel={() => setOpenQuitGame(false)} />
        <TermsDialog open={openTerms} cancel={() => setOpenTerms(false)} />
        <FragmentWrapper>
          <PageHeader>
            <LeftSide>
              <HeaderAvatar src={avatar} />
            </LeftSide>
            <MiddleSide>
              <PageHeaderText>Spaces Trivia!</PageHeaderText>
            </MiddleSide>
            <RightSide>
              <CloseIconContainer>
                <CloseIconText onClick={() => setOpenQuitGame(true)}>
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

const mapStateToProps = ({ user }) => ({
  avatar: user.avatar,
});

export default connect(mapStateToProps)(PlayGame);