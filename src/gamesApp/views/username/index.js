import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { func } from 'prop-types';
import { SpacesHeader } from '../../../components/spaces-header';
import { Button, UsernameInput } from '../../components';
import { Container } from '../../../containers/ScreenContainer';
import { Formik, Form } from "formik";
import { ReactComponent as UsernameIcon } from '../../assets/icons/username-icon.svg';


const FragmentWrapper = styled(Container)`
    width: 100%;
    text-align: center;
    animation: fromRight 0.5s ease;
    @keyframes fromRight {
        0% {
            left: 100%;
            margin-right: -100%;
        }
        100% {
            left: 50%;
            margin-right: -50%;
        }
    }
`;

const IconWrapper = styled(Container)`
    margin-top: 50px;
    margin-bottom: 50px;
`;

const ErrorMessage = styled.p`
  font-family: Montserrat;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #e02020;
`;

const ButtonWrapper = styled.div`
    width: 85%;
    margin-top: 20px;
    margin-left: 7.5%;
`;


const Username = ({ handleSubmit, userId }) => {

  return (
    <Fragment>
      <Fragment>
        <SpacesHeader />
        <FragmentWrapper>
          <IconWrapper>
            <UsernameIcon />
          </IconWrapper>
          <Formik
            initialValues={{
              username: ''
            }}
            onSubmit={values => {
              const payload = {
                gamesUserName: values.username,
                userId,
              }
              handleSubmit(payload)
            }}
          >
            {({ initialValues, values, touched, errors, setFieldValue }) => (
              <Form>
                <UsernameInput
                  label="Username"
                  placeholder="Make sure you pick a special one!"
                  height="69px"
                  value={values && values.username}
                  name="username"
                  type="text"
                  errors={
                    touched &&
                    touched.username &&
                    errors &&
                    errors.username
                  }
                  valid={`${!touched.username &&
                    !errors.username && values.username.length < 10
                    }`}
                  setFieldValue={setFieldValue}
                  initialValues={initialValues}
                  noClearButton
                  hasError={values.username.length > 12 ? true : false}
                />
                {values.username.length > 12 && <ErrorMessage>Username must not be more than 12 characters!</ErrorMessage>}
                <ButtonWrapper>
                  <Button type="submit" disabled={!values.username || values.username.length > 12}>Continue</Button>
                </ButtonWrapper>
              </Form>
            )}
          </Formik>
        </FragmentWrapper>
      </Fragment>
    </Fragment>
  );
};

Username.propTypes = {};

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});

export default connect(mapStateToProps)(Username);