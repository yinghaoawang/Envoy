import Dashboard from '../pages/Dashboard';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Root from '../pages/Root';

const publicRoutes = [
  { path: '/', component: <Root /> },
  { path: '/login', component: <Login /> },
  { path: '/signup', component: <Register /> }
];

const privateRoutes = [
  { path: '/dashboard', component: <Dashboard /> }
];

export { publicRoutes, privateRoutes };
