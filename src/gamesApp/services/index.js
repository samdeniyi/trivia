import { api } from "../constants/api";
import { utils } from "../utils";

const getAllChallenges = () => {
  return utils.getRequest(`${api.GET_ALL_CHALLENGES}`);
}

const updateGamesUsername = (payload) => {
  return utils.postRequest(`${api.UPDATE_USERNAME}`, payload);
}

const getQuestionAnswer = (challengeId, question) => {
  return utils.getRequest(`${api.GET_QUESTION_ANSWER}?challengeId=${challengeId}&question=${question}`);
}

const submitChallenge = (payload) => {
  return utils.postRequest(`${api.SUBMIT_CHALLENGE}`, payload)
}

export const gameService = {
  getAllChallenges,
  updateGamesUsername,
  getQuestionAnswer,
  submitChallenge,
};
