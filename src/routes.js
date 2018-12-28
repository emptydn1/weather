import React from 'react';
import NotFound from './component/NotFound';
import Home from './component/Home';
import Weather from './component/Weather';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/weather/:woeid',
        exact: true,
        main: ({match}) => <Weather match={match} />
    },
    {
        path: '/Weather/search/:s',
        exact: true,
        main: ({match}) => <Weather match={match} />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    }
];

export default routes;