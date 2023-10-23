import * as React from 'react'
/* istanbul ignore file -- @preserve */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  reportWebVitals,
  consoleReportHandler,
} from '@yoonghan/walcron-microfrontend-shared'
import appRoute from './routes/appRoute'
import { AuthenticationProvider } from './context/authentication'

const router = createBrowserRouter(appRoute)

export default function Root(props) {
  return (
    <React.StrictMode>
      <AuthenticationProvider>
        <RouterProvider router={router} />
      </AuthenticationProvider>
    </React.StrictMode>
  )
}

reportWebVitals(consoleReportHandler)
