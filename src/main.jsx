import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ContextProvider from './components/ContextProvider';
import Root from './components/Root';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import ProtectedHome from './components/ProtectedHome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Root></Root></PrivateRoute>,
  },
  {
    path: "/login",
    element: <ProtectedHome><SignIn></SignIn></ProtectedHome>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
