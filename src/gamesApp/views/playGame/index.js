import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
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


const LatestResults = () => {
  const [openTerms, setOpenTerms] = useState(false);

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
              value={66} 
              text={`5/20`}
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
            <CountdownText>
              00:60
            </CountdownText>
          </ProgressbarContainer>
          
          <QuestionContainer>
            <QuestionText>
              What is Quagmire’s mischievious catchphrase?
            </QuestionText>
          </QuestionContainer>
          <AnswerContainer>
            <AnswerCard>
              <AnswerText>
                Giggity
              </AnswerText>
            </AnswerCard>
            <AnswerCard>
              <AnswerText>
                Poopity
              </AnswerText>
            </AnswerCard>
            <AnswerCard>
              <AnswerText>
                Sniggity
              </AnswerText>
            </AnswerCard>
            <AnswerCard bgc="red">
              <AnswerText color="white">
                Slurpity
              </AnswerText>
            </AnswerCard>
          </AnswerContainer>
        </FragmentWrapper>
      </PageContainer>
    </Fragment>
  );
};

LatestResults.propTypes = {};

export default connect()(LatestResults);