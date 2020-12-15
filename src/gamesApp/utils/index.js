import { authHeader } from "./authHeader";
import axios from 'axios';
import { HEROKU_BASE_API } from "../constants";

export const utils = {
  postRequest: async (url, payload) => {
    const fullUrl = `${HEROKU_BASE_API}${url}`;
    let config = {
      headers: {
        ...authHeader(),
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(fullUrl, payload, config);
      return res;
    } catch (error) {
      return error;
    }
  },

  getRequest: async (url) => {
    const fullUrl = `${HEROKU_BASE_API}${url}`;
    let config = {
      headers: {
        ...authHeader(),
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.get(fullUrl, config);
      return res;
    } catch (error) {
      return error;
    }
  },

  padNumWithZero: (num) => {
    var s = "0" + num;
    return s.substr(s.length - 2);
  },

  formatDate: (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  },

  isCurrentTimeGreaterThan12pm: () => {
    let curTime = new Date();
    let day = curTime.getDay();
    curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));

    if ((curTime > 120000 && day > 0) && (curTime < 160000))
      return true;
    else
      return false;
  },

  // isCurrentTimeGreaterThan4pm: () => {
  //   let curTime = new Date();
  //   let day = curTime.getDay();
  //   curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));

  //   if ((curTime > 160000 && day > 0) && (cur))
  //     return true;
  //   else
  //     return false;
  // }


}