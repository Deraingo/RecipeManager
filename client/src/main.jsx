import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createHashRouter, RouterProvider} from "react-router-dom";
import {Provider, useSelector} from 'react-redux';
import store from './store/store';
import { Home } from './Home.jsx';
import { Login } from './Login.jsx';
import { SignUp } from './SignUp.jsx';
import { Api, ApiContext } from './utils/api.js';
import { AddRecipe } from './AddRecipe.jsx';
import { ViewRecipes } from './ViewRecipes.jsx'
import { Profile } from './Profile.jsx';
import { ChangePassword } from './ChangePassword.jsx';
import { ChangeProfilePicture } from './ChangeProfilePhoto.jsx';
import { CreateCookBook } from './CreateCookBook.jsx';

const router = createHashRouter([
  {
    path: "",
    element:  <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children:[
          {
            path: "/add_recipe",
            element: <AddRecipe />
          },
          {
            path: "/view_recipes",
            element: <ViewRecipes />
          },
          {
            path: "/profile",
            element: <Profile />,
            children: [
              {
                path: "change_password",
                element: <ChangePassword />
              },
              {
                path: "change_profile_picture",
                element: <ChangeProfilePicture />
              }
            ]
          },
          {
            path: "/create_cookbook",
            element: <CreateCookBook />
          }
        ]
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/sign_up",
        element: <SignUp />
      },
      
    ]
  }
]);


const Main = () => {
  const authToken = useSelector(state => state.application.authToken)
  const apiRef = useRef(new Api(authToken));

  useEffect(() => {
    if(apiRef.current) {
      apiRef.current.authToken = authToken;
    }
  }, [authToken])

  return (
    <ApiContext.Provider value={apiRef.current}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Main />
  </Provider>
)
