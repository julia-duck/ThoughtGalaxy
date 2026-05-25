import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Diary, ToDo, Entry} from "./App.tsx";

const router = createBrowserRouter([
  { path: '/', 
    element: <App />,
    children: [
      {
        index: true,
        element: <Entry />
      },
      {
        path: 'diary',
        element: <Diary />
      },
      {
        path: 'to-do',
        element: <ToDo />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
)


