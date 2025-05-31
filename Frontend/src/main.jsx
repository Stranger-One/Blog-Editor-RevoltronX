import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import BlogEditor from './pages/BlogEditor.jsx';
import BlogDetails from './pages/BlogDetails.jsx';


const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "blog/:blogId",
        element: <BlogDetails />,
      },
      {
        path: "editor/:blogId?",
        element: <BlogEditor />,
      },
      {
        path: 'auth',
        element: <Auth />,
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={route} />
  </Provider>,
)
