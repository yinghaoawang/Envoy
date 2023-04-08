import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

const publicRoutes = [
  { path: '/', component: <Home /> }
];

const privateRoutes = [
  { path: '/dashboard', component: <Dashboard /> }
];

export { publicRoutes, privateRoutes };
