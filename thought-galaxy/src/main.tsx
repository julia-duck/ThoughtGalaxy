import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Entry} from "./App.tsx";
import Diary from "./Diary.tsx";
import ToDo from "./ToDo.tsx";

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


