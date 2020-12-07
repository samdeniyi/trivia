import React from 'react';

import Username from '../views/username';
import Home from '../views/home'

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

];