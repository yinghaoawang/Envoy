import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './allRoutes';

const Index = () => {
  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route path={route.path} element={route.component} key={idx} />
      ))}

      {privateRoutes.map((route, idx) => (
        <Route path={route.path} element={route.component} key={idx} />
      ))}
    </Routes>
  );
};

export default Index;
