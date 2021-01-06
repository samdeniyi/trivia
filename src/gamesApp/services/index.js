import { api } from "../constants/api";
import { utils } from "../utils";

const getAllChallenges = () => {
  return utils.getRequest(`${api.GET_ALL_CHALLENGES}`);
}

const updateGamesUsername = (payload) => {
  return utils.postRequest(`${api.UPDATE_USERNAME}`, payload);
}

const getQuestionAnswer = (payload) => {
  return utils.postRequest(`${api.GET_QUESTION_ANSWER}`, payload);
}

const submitChallenge = (payload) => {
  return utils.postRequest(`${api.SUBMIT_CHALLENGE}`, payload)
}

const getSubmissionsForToday = (userId) => {
  return utils.getRequest(`${api.GET_SUBMISSIONS_FOR_TODAY}?userId=${userId}`);
}

const getGamesUsername = (userId) => {
  return utils.getRequest(`${api.GET_GAMES_USERNAME}?userId=${userId}`);
}

const getTopUsers = () => {
  return utils.getRequest(`${api.GET_TOP_USERS}`);
}


export const gameService = {
  getAllChallenges,
  updateGamesUsername,
  getQuestionAnswer,
  submitChallenge,
  getSubmissionsForToday,
  getGamesUsername,
  getTopUsers,
};
