import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { updateTeam } from '../../../../redux/ducks/applications/agents/actions';

import { UpdateTeamValidationSchema } from './UpdateTeamValidationSchema';
import { Loader, TopHeader, InputWithLabel, TextareaWithLabel, RippleButton } from '../../../../components';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { InputBlock } from '../../../../containers/InputContainer';
import { connect } from 'react-redux';
import { bool, func, object } from 'prop-types';

const UpdateTeam = ({
    isLoading,
    location,
    teams,
    updateTeam
}) => {
    const teamId = location.state;
    const team   = teams.filter(team => team.id === teamId)[0];

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Update Team Details"} />
            <ScreenContainer>
                <Formik
                    initialValues={{
                        name: "",
                        description: ""
                    }}
                    validationSchema={UpdateTeamValidationSchema}
                    onSubmit={(values) => {
                        setTimeout(() => {
                            updateTeam(teamId, values);
                        }, 200);
                    }}
                >
                {({ errors, touched, setFieldValue, initialValues, values }) => (
                    <Form>
                        <InputBlock>
                            <InputWithLabel
                                label={"Team name"}
                                type={"text"}
                                value={values.name}
                                name={"name"}
                                placeholder={team.name}
                                valid={`${(!touched.name && !errors.name)}`}
                                errors={(touched && touched.name) && (errors && errors.name)}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                            />
                            <TextareaWithLabel
                                name={"description"}
                                value={values.description}
                                placeholder={team.description}
                                height={"96px"}
                                valid={`${(!touched.description && !errors.description)}`}
                                errors={(touched && touched.description) && (errors && errors.description)}
                            />
                        </InputBlock>
                        <RippleButton 
                            disabled={isLoading} 
                            top={"36px"} 
                            type={"submit"}
                        >
                            Update
                        </RippleButton>
                    </Form>
                )}    
                </Formik>
            </ScreenContainer>
        </Fragment>
    );
};

UpdateTeam.propTypes = {
    isLoading:  bool,
    updateTeam: func,
    location:   object
};

const mapStateToProps = ({ applications }) => ({
    isLoading: applications.agents.isLoading,
    teams:     applications.agents.teams
});

export default connect(
    mapStateToProps, 
    { updateTeam }
)(withRouter(UpdateTeam));