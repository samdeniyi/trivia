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
      if(res.status === 401){
        window.location.assign('/');
      } else {
        return res;
      }
    } catch (error) {
      return error;
    }
  },

  padNumWithZero: (num) => {
    var s = "0" + num;
    return s.substr(s.length - 2);
  },

  formatDate: (date) => {
    let m = new Date(date);
    return `${(m.getUTCMonth()+1)}/${m.getUTCDate()}/${m.getUTCFullYear()}`;
  },

  isCurrentTimeGreaterThan12pm: () => {
    let curTime = new Date();
    // let day = curTime.getDay();
    curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));

    if ((curTime > 120000) && (curTime < 160000))
      return true;
    else
      return false;
  },

  isCurrentTimeGreaterThan4pm: () => {
    let curTime = new Date();
    // let day = curTime.getDay();
    curTime = parseInt(curTime.getHours() + "" + ("0" + curTime.getMinutes()).substr(-2) + "" + ("0" + curTime.getSeconds()).substr(-2));

    if ((curTime > 160000))
      return true;
    else
      return false;
  },

  shuffleArray(arra1) {
    if (arra1 && arra1.length > 0) {
      let ctr = arra1?.length;
      let temp;
      let index;
      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
      }
      return arra1;
    } else {
      return [];
    }
  },

  shuffleQuestionOptions(questions) {
    return questions.map((item) => {return {
      answer: item.answer,
      options: this.shuffleArray(item.options),
      questionLevel: item.questionLevel,
      questionLifeLineCostQuantity: item.questionLifeLineCostQuantity,
      questionMultiPlayerPoints: item.questionMultiPlayerPoints,
      questionText: item.questionText
    }});
  },
 
  formatNumberWithCommas: x => {
    try {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } catch (error) {}
  },


}