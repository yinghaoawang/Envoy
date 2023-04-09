import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Auth/Login';
import Root from '../pages/Root';
import Register from '../pages/Auth/Register';

const publicRoutes = [
  { path: '/', component: <Root /> },
  { path: '/login', component: <Login /> },
  { path: '/signup', component: <Register /> }
];

const privateRoutes = [
  { path: '/dashboard', component: <Dashboard /> }
];

export { publicRoutes, privateRoutes };
