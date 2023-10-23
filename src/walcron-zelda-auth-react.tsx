import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import singleSpaReact from 'single-spa-react'
import Root from './root.component'

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null
  },
  renderType: 'createRoot',
})

export const { bootstrap, mount, unmount } = lifecycles
