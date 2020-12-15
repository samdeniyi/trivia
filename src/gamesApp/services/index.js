import { api } from "../constants/api";
import { utils } from "../utils";

const getAllChallenges = () => {
  return utils.getRequest(`${api.GET_ALL_CHALLENGES}?page=0&pageSize=2`);
}

const updateGamesUsername = (payload) => {
  return utils.postRequest(`${api.UPDATE_USERNAME}`, payload);
}

export const gameService = {
  getAllChallenges,
  updateGamesUsername
};
