import { ConfigProvider } from 'antd';
import { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// import 'app/assets/styles/main.scss';
import { Loading } from './components/common/Loading';

import routes from '../routers';
// import { ProtectedRoute } from './router/ProtectedRoute';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Sawarabi Gothic, sans-serif',
        },
      }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />
          {routes.map((route) => {
            const Protected = Fragment;
            const Layout = route.layout ?? Fragment;
            const Component = route.component;
            // const isAdmin = route.isAdmin;
            return (
              <Route
                key={route.key}
                path={route.path}
                element={
                  // <Protected isAdmin={isAdmin}>
                  <Protected>
                    <Layout>
                      <Suspense fallback={<Loading size="large" />}>
                        <Component />
                      </Suspense>
                    </Layout>
                  </Protected>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
