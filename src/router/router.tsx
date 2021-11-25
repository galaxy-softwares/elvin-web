import React, { ComponentType, FC, lazy } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import LayoutPage, { OutletLayout } from '../layout/layoutPage'
import LoginPage from '../view/login/loginPage'

type RouteWrapperProps = {
  element: React.LazyExoticComponent<ComponentType<any>>
}

const RouteWrapper: React.FC<RouteWrapperProps> = props => {
  const { element: ElementComponent } = props
  return <ElementComponent />
}

export const RenderRouter: FC = () => {
  const routeList: Array<RouteObject> = [
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        {
          path: 'dashboard',
          element: <OutletLayout />,
          children: [
            { path: '', element: <RouteWrapper element={lazy(() => import('../view/home/homePage'))} /> },
            { path: 'project', element: <RouteWrapper element={lazy(() => import('../view/project/projectPage'))} /> },
            { path: 'team', element: <RouteWrapper element={lazy(() => import('../view/team/teamPage'))} /> }
          ]
        },
        {
          path: 'user',
          element: <OutletLayout />,
          children: [
            { path: '', element: <RouteWrapper element={lazy(() => import('../view/user/userPage'))} /> },
            {
              path: 'detail/:session_id/:user_id',
              element: <RouteWrapper element={lazy(() => import('../view/user/useDetailPage'))} />
            }
          ]
        },
        {
          path: '/jsErr',
          element: <OutletLayout />,
          children: [
            {
              path: '',
              element: <RouteWrapper element={lazy(() => import('../view/jsErr/jsErrPage'))} />
            },
            {
              path: 'detail/:error_id',
              element: <RouteWrapper element={lazy(() => import('../view/jsErr/jsErrDetailPage'))} />
            }
          ]
        },
        {
          path: '/performance',
          element: <RouteWrapper element={lazy(() => import('../view/performance/performancePage'))} />
        },
        {
          path: '/http',
          element: <RouteWrapper element={lazy(() => import('../view/http/httpPage'))} />
        },
        {
          path: '/staticErr',
          element: <RouteWrapper element={lazy(() => import('../view/staticErr/staticErrPage'))} />
        }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ]
  return useRoutes(routeList)
}
