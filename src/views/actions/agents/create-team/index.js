import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { bool, array, func } from 'prop-types';
import { createTeam } from '../../../../redux/ducks/applications/agents/actions';

import { CreateTeamValidationSchema } from './CreateTeamValidationSchema';
import { ScreenContainer } from '../../../../containers/ScreenContainer';
import { Message } from '../../../../containers/MessageContainer';
import { InputBlock } from '../../../../containers/InputContainer';
import { 
    Loader,
    TopHeader,
    InputWithLabel,
    TextareaWithLabel,
    RippleButton,
    TeamCreationResult
} from '../../../../components';
import AddTeamAgents from '../add-agents';

const CreateTeam = ({
    isLoading,
    createTeam,
    referrals
}) => {
    const [createTeamSuccess, setCreateTeamSuccess]     = useState(false);
    const [openAddAgentOverlay, setOpenAddAgentOverlay] = useState(false);
    const [teamId, setTeamId]                           = useState(undefined);
    const [teamData, saveTeamData]                      = useState({});

    return (
        isLoading ?
        <Loader /> :
        <Fragment>
            <TopHeader title={"Create A Team"} />
            <ScreenContainer>
                <Message bottom={"24px"}>Enter the details of the team you want to create.</Message>
                <TeamCreationResult
                    open={createTeamSuccess}
                    toggleOpen={() => setCreateTeamSuccess(!createTeamSuccess)}
                    teamName={teamData.name}
                    addTeamAgents={() => {
                        setCreateTeamSuccess(!createTeamSuccess);
                        setOpenAddAgentOverlay(!openAddAgentOverlay);
                    }}
                />
                <Formik
                    initialValues={{
                        name: "",
                        description: ""
                    }}
                    validationSchema={CreateTeamValidationSchema}
                    onSubmit={(values) => {
                        setTimeout(async () => {
                            saveTeamData(values);
                            const id = await createTeam(values);
                            if (id) setTeamId(id);
                            setCreateTeamSuccess(!createTeamSuccess);
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
                                placeholder={"Team name"}
                                name={"name"}
                                valid={`${(!touched.name && !errors.name)}`}
                                errors={(touched && touched.name) && (errors && errors.name)}
                                setFieldValue={setFieldValue}
                                initialValues={initialValues}
                            />
                            <TextareaWithLabel
                                name={"description"}
                                value={values.description}
                                disabled={isLoading}
                                placeholder={"Add a team description that will be visible to all agents of this team."}
                                height={"96px"}
                                valid={`${(!touched.description && !errors.description)}`}
                                errors={(touched && touched.description) && (errors && errors.description)}
                            />
                        </InputBlock>
                        <RippleButton disabled={isLoading} top={"36px"} type={"submit"}>
                            Create team
                        </RippleButton>
                    </Form>
                )}    
                </Formik>
                {openAddAgentOverlay && (
                    <AddTeamAgents 
                        referrals={referrals} 
                        open={openAddAgentOverlay}
                        setOpen={setCreateTeamSuccess}
                        teamId={teamId}
                    />
                )}
            </ScreenContainer>
        </Fragment>
    );
};

CreateTeam.propTypes = {
    isLoading:  bool,
    referrals:  array,
    createTeam: func
};

const mapStateToProps = ({ applications }) => ({
    referrals: applications.agents.referrals
});

export default connect(
    mapStateToProps,
    { createTeam }
)(CreateTeam);