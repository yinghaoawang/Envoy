import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './allRoutes';
import DefaultLayout from '../layouts/Default';
import NonAuthLayout from '../layouts/NonAuth';

const Routes = () => {
  return (
    <ReactRoutes>
      {publicRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            <NonAuthLayout>
              {route.component}
            </NonAuthLayout>
          }
          key={idx}
        />
      ))}

      {privateRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <DefaultLayout>
                {route.component}
              </DefaultLayout>
            }
            key={idx}
          />
      ))}
    </ReactRoutes>
  );
};

export default Routes;
