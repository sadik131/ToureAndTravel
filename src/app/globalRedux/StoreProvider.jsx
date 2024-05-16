"use client"
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import { store } from './store'

function StoreProvider({ children }) {
    return <SessionProvider>
        <Provider store={store}>{children}</Provider>
    </SessionProvider>
}

export default StoreProvider