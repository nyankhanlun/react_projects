import React from 'react'
import ReactDOM from 'react-dom/client'
import Posts, { loader as PostLoader } from './routes/Posts'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NewPost, { action as newPostAction } from './routes/NewPost'
import RootLayout from './routes/RootLayout'
import PostDetails, {loader as PostDetailsLoader} from './routes/PostDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: PostLoader,
        children: [
          {
            path: '/create-post',
            element: <NewPost />,
            action: newPostAction
          },
          {
            path: '/:postId',
            element: <PostDetails />,
            loader : PostDetailsLoader
          }
        ]
      },
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
)
