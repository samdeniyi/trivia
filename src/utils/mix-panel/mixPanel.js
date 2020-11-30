var mixpanel = require('mixpanel-browser');
mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY);
const isMixPanelON = process.env.REACT_APP_MIXPANEL_STATE === "true";

let actions = {
  identify: (id) => {
    if (isMixPanelON) 
        mixpanel.identify(id);
  },
  alias: (id) => {
    if (isMixPanelON) 
        mixpanel.alias(id);
  },
  track: (name, props) => {
    if (isMixPanelON) 
        mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (isMixPanelON) 
          mixpanel.people.set(props);
    },
  },
};

export let mixPanel = actions;