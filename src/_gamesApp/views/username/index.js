import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { func } from 'prop-types';
import { SpacesHeader } from '../../../components/spaces-header';
import { InputWithLabel } from '../../../components';
import {Button, UsernameInput} from '../../components';
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


const Username = () => {

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
                  valid={`${touched.username &&
                    !errors.username
                    }`}
                  setFieldValue={setFieldValue}
                  initialValues={initialValues}
                  noClearButton
                />
                  <Button type="submit">Continue</Button>
                </Form>
              )}
          </Formik>
        </FragmentWrapper>
      </Fragment>
    </Fragment>
  );
};

Username.propTypes = {};

export default connect()(Username);