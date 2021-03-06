import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import App from './containers/App'
import { State } from './reducers'

const initialState: State = {
    credentials: {
        server: 'irc.freenode.net',
        port: 6667,
        username: `testuser${Math.round(Math.random() * 10000)}`,
        channels: '###test'
    },
    viewMode: 'DEFAULT',
    connections: [],
    currentServer: null
}

const store = configureStore(initialState)

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('app')
    )
}

if (module.hot) {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderApp = render
    const renderError = (error: Error) => {
        // TODO: Figure out to integrate with current electron error handler
    }

    render = () => {
        try {
            renderApp()
        }
        catch (error) {
            renderError(error)
        }
    }

    module.hot.accept('./containers/App', () => {
        setTimeout(render)
    })
}

render()
