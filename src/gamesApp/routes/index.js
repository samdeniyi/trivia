import React from 'react';

import Username from '../views/username';
import Home from '../views/home'
import LatestResults from '../views/latestResults';
import GamePass from '../views/gameResult/gamePass';
import GameFail from '../views/gameResult/gameFail';
import PlayGame from '../views/playGame';

export const gameRoutes = [
  {
    path: '/games',
    exact: true,
    main: () => <Home />,
    public: false
  },
  {
    path: '/games/username',
    exact: true,
    main: () => <Username />,
    public: false
  },
  {
    path: '/games/latest-results',
    exact: true,
    main: () => <LatestResults />,
    public: false
  },
  {
    path: '/games/result-fail',
    exact: true,
    main: () => <GameFail />,
    public: false
  },
  {
    path: '/games/result-pass',
    exact: true,
    main: () => <GamePass />,
    public: false
  },
  {
    path: '/games/play',
    exact: true,
    main: () => <PlayGame />,
    public: false
  },

];