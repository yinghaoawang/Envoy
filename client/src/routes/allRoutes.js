import Home from '../pages/Home';

const publicRoutes = [
  { path: '/', component: <Home /> }
];

const privateRoutes = [
  { path: '/dashboard', component: <Home /> }
];

export { publicRoutes, privateRoutes };
